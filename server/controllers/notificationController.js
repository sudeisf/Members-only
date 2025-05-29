
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
  }
  ,
    async markAsRead(req,res){
        const notificationID = req.params.id;
        try {
            const response = await notification.markAsRead(notificationID);
            if (response.success) {
              return res.status(200).json({
                message: response.message,
              });
            }
          } catch (error) {
            console.error('Error marking notification as read:', error);
            return res.status(500).json({ message: "Failed to mark notification as read." });
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
