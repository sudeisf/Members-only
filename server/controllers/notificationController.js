
const notification = require('../services/notficationService');
const db = require('../config/database')


module.exports ={


  async getNotification (req,res) {
    try {
      const userId = req.session.user.id;
      const result = await db.query(
        `
        SELECT id, title, message, club_id, is_read, created_at
        FROM notifications
        WHERE user_id = $1
        ORDER BY created_at DESC
        `,
        [userId]
      );
  
      return res.status(200).json({
        success: true,
        notifications: result.rows
      });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch notifications"
      });
    }
  },
  async markAsRead(req, res) {
    try {
      // Parse and validate notificationId
      const notificationId = req.params.id;
      if (!notificationId || isNaN(parseInt(notificationId))) {
        return res.status(400).json({ error: 'Invalid notification ID' });
      }
  
      // Validate user authentication
      const userId = req.session.user.id;
      if (!userId || isNaN(parseInt(userId))) {
        return res.status(401).json({ error: 'User not authenticated or invalid user ID' });
      }
  
      // Log request for debugging
      console.log('Mark as read request:', { notificationId, userId });
  
      const result = await notification.markAsRead(notificationId, userId);
      res.status(200).json(result);
    } catch (err) {
      console.error('Error marking notification as read:', err);
      const status = err.message.includes('not found') ? 404 : err.message.includes('Unauthorized') ? 403 : 400;
      res.status(status).json({ error: err.message });
    }
  },
    async markAllAsRead(req, res) {
        const userID =  req.session.user.id;
      
        try {
          const response = await notification.markAllAsRead(userID);
          if (response.success) {
            return res.status(200).json({
              message: response.message,
            });
          } else {
            return res.status(400).json({
              message: "No notifications to update.",
            });
          }
        } catch (error) {
          console.error('Error marking notifications as read:', error);
          return res.status(500).json({ message: "Failed to mark notifications as read." });
        }
      }

}
