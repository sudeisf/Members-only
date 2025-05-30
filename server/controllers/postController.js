

const db = require('../config/database');
const { getIO } = require('../config/socket');





const createPost = async (req, res) => {
    const userID = req.session.user.id;
    const clubID = req.params.id;
    const message = req.body.content;
  
    try {
      // Insert the message first and return the basic fields
      const insertResult = await db.query(
        `INSERT INTO messages (content, user_id, club_id)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [message, userID, clubID]
      );
  
      const insertedMessage = insertResult.rows[0];
  
      // Join the inserted message with user and club data
      const enrichedResult = await db.query(
        `SELECT 
           m.id,
           m.content AS message_content,
           m.user_id,
           m.club_id,
           m.sent_at,
           u.firstname,
           u.lastname,
           u.email,
           c.name AS club_name
         FROM messages m
         JOIN users u ON m.user_id = u.id
         JOIN clubs c ON m.club_id = c.id
         WHERE m.id = $1`,
        [insertedMessage.id]
      );
  
      const response = enrichedResult.rows[0];
      console.log("data from db" ,response)
      const io = getIO();
      io.emit("new_post", response);
  
      res.status(200).json({
        success: true,
        message: "The post has been created successfully",
        post: response,
      });
  
    } catch (err) {
      console.error("Error creating post:", err);
      res.status(400).json({
        success: false,
        message: "The post has not been created successfully",
        error: err.message,
      });
    }
  };
  


  const getPost = async (req, res) => {
    try {
      const clubID = req.params.id;
  
      const result = await db.query(
        `SELECT m.id, m.content AS message_content, m.user_id, m.club_id, m.sent_at,
                u.firstname, u.lastname, u.email, c.name AS club_name
         FROM messages m
         JOIN users u ON m.user_id = u.id
         JOIN clubs c ON m.club_id = c.id
         WHERE m.club_id = $1
         ORDER BY m.sent_at DESC;`,
        [clubID]
      );
  
      const posts = result.rows;
  
      res.status(200).json({
        success: true,
        message: posts.length > 0 ? "Posts retrieved successfully" : "No posts found for this club",
        result: posts, 
      });
    } catch (err) {
      console.error("Error in getPost:", err);
      res.status(400).json({
        success: false,
        message: "Failed to retrieve posts",
        error: err.message,
      });
    }
  };
  


const getAllPosts = async (req, res) => {
    try {
       
        const result = await db.query(
            `Select * from messages where user_id = $1 order by sent_at desc;`,
            [req.user.id]
        );

        const response = result.rows;

        res.status(200).json({
            success: true,
            message: "Fetched all posts for the user successfully",
            data: response
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Failed to fetch posts for the user",
            error: err.message
        });
    }
}

module.exports = {
    createPost,
    getPost,
    getAllPosts
}