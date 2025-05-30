const db = require('../config/database');
const socket = require('../config/socket');

module.exports = {
  async newMember(userId, clubID) {
    try {
      // Validate inputs
      if (!userId || !clubID || isNaN(parseInt(userId)) || isNaN(parseInt(clubID))) {
        throw new Error('Invalid userId or clubID');
      }
  
      const client = await db.connect();
      try {
        await client.query('BEGIN');
  
        // Fetch existing club members (excluding the new member)
        const { rows: members } = await client.query(
          `SELECT user_id FROM club_user WHERE club_id = $1 AND user_id != $2`,
          [clubID, userId]
        );
  
        // Fetch the new member's firstname
        const { rows: [user] } = await client.query(
          `SELECT firstname FROM users WHERE id = $1`,
          [userId]
        );
  
        if (!user) {
          throw new Error(`User with ID ${userId} not found`);
        }
  
        // Prepare notification for existing members
        const memberIds = members.length ? members.map(m => m.user_id) : [];
        const titleForMembers = 'New Member Joined';
        const messageForMembers = `${user.firstname} joined the club! Welcome them!`;
  
        // Prepare notification for the new user
        const titleForNewUser = 'Welcome to the Club!';
        const messageForNewUser = `You have successfully joined the club!`;
  
        // Combine all user IDs to notify (existing members + new user)
        const allUserIds = [...memberIds, userId];
  
        if (!allUserIds.length) {
          console.log(`No users to notify for club ${clubID}`);
          await client.query('COMMIT');
          return;
        }
  
        // Insert notifications for all users in a single query
        await client.query(
          `
            INSERT INTO notifications 
            (user_id, club_id, message, title, is_read, created_at)
            SELECT 
              m.user_id, 
              $1, 
              CASE 
                WHEN m.user_id = $2 THEN $3
                ELSE $4
              END,
              CASE 
                WHEN m.user_id = $2 THEN $5
                ELSE $6
              END,
              false,
              NOW()
            FROM unnest($7::int[]) AS m(user_id)
          `,
          [
            clubID,
            userId,              // $2: userId for CASE condition
            messageForNewUser,   // $3: message for new user
            messageForMembers,   // $4: message for existing members
            titleForNewUser,     // $5: title for new user
            titleForMembers,     // $6: title for existing members
            allUserIds           // $7: array of all user IDs to notify
          ]
        );
  
        await client.query('COMMIT');
        console.log(`Notifications sent for club ${clubID} to ${allUserIds.length} users`);
  
        // Emit WebSocket notifications
        const io = socket.getIO();
        if (io) {
          // Notify existing members
          if (memberIds.length) {
            memberIds.forEach(memberId => {
              try {
                io.to(`user:${memberId}`).emit('notification:new', {
                  title: titleForMembers,
                  message: messageForMembers,
                  clubID,
                });
              } catch (wsError) {
                console.error('WebSocket error for user', memberId, wsError);
              }
            });
          }
  
          // Notify the new user
          try {
            io.to(`user:${userId}`).emit('notification:new', {
              title: titleForNewUser,
              message: messageForNewUser,
              clubID,
            });
          } catch (wsError) {
            console.error('WebSocket error for new user', userId, wsError);
          }
        }
      } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error in newMember transaction:', err.message);
        throw err;
      } finally {
        client.release();
      }
    } catch (err) {
      console.error('Error in newMember:', err.message);
      throw err;
    }
  },

  async markAsRead(notificationID, userId) {
    const client = await db.connect();
    try {
      await client.query('BEGIN');
  
      // Validate inputs
      if (!notificationID || !userId || isNaN(parseInt(notificationID)) || isNaN(parseInt(userId))) {
        throw new Error('Invalid notificationID or userId');
      }
  
      // Log inputs for debugging
      console.log('Attempting to mark notification as read:', { notificationID, userId });
  
      // Check if the notification exists and belongs to the user
      const checkResult = await client.query(
        `
          SELECT id, user_id, is_read 
          FROM notifications 
          WHERE id = $1
        `,
        [notificationID]
      );
  
      if (checkResult.rows.length === 0) {
        console.log('Notification not found:', { notificationID });
        throw new Error('Notification not found');
      }
  
      const notification = checkResult.rows[0];
      if (notification.user_id !== parseInt(userId)) {
        console.log('Unauthorized: Notification does not belong to this user:', {
          notificationID,
          userId,
          notificationUserId: notification.user_id,
        });
        throw new Error('Unauthorized: Notification does not belong to this user');
      }
  
      // Log if the notification is already read (for debugging, though not part of the WHERE clause)
      if (notification.is_read) {
        console.log('Notification already marked as read:', { notificationID, userId });
      }
  
      // Update the notification
      const result = await client.query(
        `
          UPDATE notifications 
          SET is_read = true
          WHERE id = $1 AND user_id = $2
          RETURNING *
        `,
        [notificationID, userId]
      );
  
      if (result.rowCount === 0) {
        console.log('Update failed - notification not found or user mismatch:', { notificationID, userId });
        throw new Error('Notification not found or user mismatch');
      }
  
      await client.query('COMMIT');
      console.log('Notification marked as read successfully:', { notificationID, userId });
  
      // Emit WebSocket event
      const io = socket.getIO();
      if (io) {
        io.to(`user:${userId}`).emit('notification:read', {
          message: 'Notification marked as read',
          notificationID,
        });
      }
  
      return { 
        success: true, 
        message: 'Notification marked as read',
        notification: result.rows[0],
      };
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('Error in markAsRead:', err.message);
      throw err;
    } finally {
      client.release();
    }
  },

  async markAllAsRead(userId) {
    const client = await db.connect();
    try {
      await client.query('BEGIN');

      const result = await client.query(
        `UPDATE notifications
         SET is_read = true
         WHERE user_id = $1 AND is_read = false
         RETURNING COUNT(*) as count`,
        [userId]
      );

      const count = parseInt(result.rows[0]?.count || 0);

      await client.query('COMMIT');

      const io = socket.getIO();
      if (io && count > 0) {
        io.to(`user:${userId}`).emit('notification:allRead', {
          message: `${count} notifications marked as read`
        });
      }

      return {
        success: true,
        message: count > 0 
          ? `${count} notification(s) marked as read`
          : "All notifications were already marked as read",
        count
      };
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('Error in markAllAsRead:', err.message);
      throw err;
    } finally {
      client.release();
    }
  }
};