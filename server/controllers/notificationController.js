const {io} = require('../app');
const notification = require('../services/notficationService');


module.exports ={

    async markAsRead(req,res){
        const notificationID = req.params.id;
        try {
            const response = await notification.markAsRead(notificationID, io);
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
          const response = await notification.markAllAsRead(userID, io);
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
