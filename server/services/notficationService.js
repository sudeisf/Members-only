const db = require('../config/database')

module.exports ={
    async newMember(userId , clubID ) {
        const { rows: members } = await db.query(
            `SELECT user_id FROM club_user WHERE club_id = $1 AND user_id != $2;`,
            [clubID, userId]
          );

        const { rows: [user] } = await db.query(
        `SELECT username FROM users WHERE id = $1;`,
        [userId]
        );

        if (!members.length) return;
        const memberIds = members.map(m => m.user_id);

        const title = 'New Member Joined';
        const message = `${user.username} joined the club! Welcome them!`;
        await db.query(`
                INSERT INTO notifications 
                (user_id, club_id,message,title ,is_read)
                SELECT 
                m.user_id, 
                $1, 
                $2, 
                $3,
                false,
                NOW()
                FROM unnest($6::int[]) AS m(user_id)
            `,
            [clubID, message,title, memberIds])

            memberIds.forEach(userId => {
                io.to(`user:${userId}`).emit('notification:new', {
                  title,
                  message,
                  clubID,
                });
              });
    },
    async markAsRead(notificationID) {
        const result = await db.query(
          `
          UPDATE notifications
          SET is_read = true
          WHERE id = $1
          `,
          [notificationID]
        );
        if (result.rowCount === 0) {
            throw new Error("Notification not found or already marked as read.");
          }
          io.to(`user:${userId}`).emit('notification:new', {message : "Notification marked as read." , notificationID })
          return { success: true, message: "Notification marked as read." };
      },
    async markAllAsRead(userId){
        const result = await db.query(`
            UPDATE notifications
            SET is_read = true
            where user_id = $1
            `,[userId]);
        if (result.rowCount === 0) {
            return {
                success: true,
                message: "All notifications were already marked as read.",
              };
            }
        if (result.rowCount > 0) {
                io.to(`user:${userId}`).emit('notification:allRead', {
                  message: `${result.rowCount} notifications marked as read.`,
                });
                return {
                    success: true,
                    message: `${result.rowCount} notification(s) marked as read.`,
                  };
                };
        return {
                success: true,
                message: `${result.rowCount} notification(s) marked as read.`,
              };
    }
}