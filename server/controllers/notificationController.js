// const pool = require('../config/database');
// const { io } = require('../app');

// const New_notification = async (req, res) => {
//     try {
//         // Destructure user_id and message from the request body
//         const { user_id, message } = req.body;

//         if (!user_id || !message) {
//             return res.status(400).json({
//                 success: false,
//                 msg: "User ID and message are required",
//             });
//         }

//         // Insert the notification into the database
//         const result = await pool.query(`
//             INSERT INTO notifications (user_id, message) 
//             VALUES ($1, $2) 
//             RETURNING *;
//         `, [user_id, message]);

//         const response = result.rows[0];

//         // Log the response to ensure it's coming through correctly
//         console.log('Notification created:', response);

//         // Emit the notification to the specific user
//         io.to(user_id).emit('New_notification', response);

//         return res.status(200).json({
//             success: true,
//             msg: "Notification sent successfully",
//         });
        
//     } catch (err) {
//         console.error('Error creating notification:', err);  // Log the error for debugging
        
//         return res.status(500).json({
//             success: false,
//             msg: "Error extracting notifications",
//         });    
//     }
// };

// // Export the function using CommonJS
// module.exports = { New_notification };
