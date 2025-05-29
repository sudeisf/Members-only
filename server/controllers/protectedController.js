const { use } = require('passport');
const db  = require('../config/database');
const notification = require('../services/notficationService')



const privateGetClubs  = async (req, res) => {
    try{
        const response = await db.query('select * from clubs ;');
        const clubData = response.rows;
        res.status(200).json({
            success: true,
            club : clubData
        });
        
    }catch(err) {
        res.status(401).json({
            success: false,
            msg : "error extractiing club"
        })
    }
}

const privateClubGet = async (req, res) => {
    try {
      const userId = req.session.user.id
  
      // Modified SQL Query
      const response = await db.query(`
        SELECT c.*
        FROM clubs c
        LEFT JOIN club_user cu ON cu.club_id = c.id AND cu.user_id = $1
        WHERE cu.user_id IS NULL;
      `,
        [userId]
      );
  
      const clubData = response.rows;
      // console.log(clubData);
  
      res.status(200).json({
        success: true,
        clubs: clubData,  // Use plural for clarity
      });
  
    } catch (err) {
      console.error('Error extracting clubs:', err); // Log error for debugging
      res.status(500).json({
        success: false,
        msg: "Error extracting clubs",
      });
    }
  };
  

const privateJoinClubGet = async (req, res) => {
    
    
    const clubID = req.params.id; 
    const userID = req.session.user ? req.session.user.id: null; 
  
    try {
        const secret_key = req.body.secretKey;
        const result_p = await db.query(`SELECT * FROM clubs WHERE secret = $1`, [secret_key]);
        if (result_p.rows.length > 0) {
            const result = await db.query(`
                INSERT INTO club_user (user_id, club_id) VALUES ($1, $2);
            `, [userID, clubID]);
            
            i
            await notification.newMember(userID,clubID)

            res.status(200).json({
                success : true,
                message: "The user has successfully joined the club",
                result: result
            });
        } else {
            res.status(400).json({
                message: 'The secret key is not correct'
            });
        }
    } catch (err) {
        console.log('There is some error:', err);
        res.status(500).json({ error: 'An error occurred while joining the club' });
    }
};




const getClubsJoined = async (req, res) => { 
  const userID = req.session.user ? req.session.user.id: null;
  try{
   const result = await db.query(`
                SELECT * 
                  FROM clubs 
                  WHERE id IN (
                      SELECT DISTINCT club_id 
                      FROM club_user 
                      WHERE user_id = $1
            );
  `, [userID]);

      const response = result.rows;

      res.status(200).json({  
        success : true, 
        message: "The user has successfully joined the club",
        result: response
      });

      // console.log(response);
      
  }catch(err){
    res.status(400).json({
        success : false,
        message: "The user has not successfully joined the club",
    });

  }
}

// const privatePostControllerGet = async (req, res) => {
//   try {
//     const { club_id } = req.query; // Extract club_id from query params

    
//     if (!club_id) {
//       return res.status(400).json({
//         success: false,
//         message: "club_id is required",
//       });
//     }
//     const result = await db.query(
//       `
//       SELECT 
//         c.name AS club_name, 
//         m.content AS message_content, 
//         u.firstname,
//         u.lastname,
//         u.email, 
//         c.id ,
//         m.sent_at
//       FROM messages m
//       JOIN users u ON m.user_id = u.id
//       JOIN clubs c ON m.club_id = c.id
//       WHERE  m.club_id = $1
//       ORDER BY m.sent_at DESC
//       `,
//       [club_id]
//     );

//     // Handle empty result set
//     if (result.rows.length === 0) {
//       console.log(result.rows)
//       return res.status(404).json({
//         success: false,
//         message: "No messages found for this club",
//       });
//     }

//     // Return the results
//     res.status(200).json({
//       success: true,
//       result: result.rows,
//     });
//   } catch (err) {
//     console.error("Error in privatePostControllerGet:", err);

//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };


const privatePostControllerGetTwo = async (req, res) => {
   
  try {
    // Fetch posts/messages using SQL
    const result = await db.query(
      ` 
      SELECT 
        c.name AS club_name, 
        m.content AS message_content, 
        u.firstname,
        u.lastname,
        u.email, 
        c.id ,
        m.sent_at
      FROM messages m
      JOIN users u ON m.user_id = u.id
      JOIN clubs c ON m.club_id = c.id
      ORDER BY m.sent_at DESC
      `
     
    );

    // Handle empty result set
    if (result.rows.length === 0) {
      console.log(result.rows)
      return res.status(404).json({
        success: false,
        message: "No messages found for this club",
      });
    }

    // Return the results
    res.status(200).json({
      success: true,
      result: result.rows,
    });
  } catch (err) {
    console.error("Error in privatePostControllerGet:", err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}



const getClubById = async (req, res) => {

  try {
       const club_id = req.params.id;
       const  user_id = req.session.user ? req.session.user.id: null;
       const result  = await db.query(`
        select * from clubs where id = $1 
        `,[
          club_id,
        ])

        const response = result.rows;

        res.status(200).json({
          success : true,
          message: "The user has successfully joined the club",
          result: response
        });

  } catch (err) {
      res.status(400).json({
          success : false,
          message: "The user has not successfully joined the club",
      });
  }
} 




// const privateMessagePost = async (req, res) => {
  
//   const {io} = require('../app');

//   const data = {
//     user_id: req.body.user_id,
//     club_id: req.body.club_id,
//     message: req.body.content
//   }; 

//   try {
  
//     const result = await db.query(`
//       INSERT INTO messages (content, user_id, club_id) VALUES ($1, $2, $3) RETURNING *;`,
//       [data.message, data.user_id, data.club_id]
//     );

//     const messageData = result.rows[0];

    
//     const userResult = await db.query(`
//       SELECT firstname, lastname, email FROM users WHERE id = $1;`,
//       [data.user_id]
//     );

//     const userData = userResult.rows[0];

    
//     const clubResult = await db.query(`
//       SELECT name, id ,coverpic FROM clubs WHERE id = $1;`,
//       [data.club_id]
//     );

//     const clubData = clubResult.rows[0];

   
//     const transformedMessageData = {
//       m_id: messageData.id,               
//       firstname: userData.firstname,     
//       lastname: userData.lastname,      
//       email: userData.email,             
//       message_content: messageData.content, 
//       sent_at: messageData.sent_at,      
//       club_name: clubData.club_name,     
//       id:  clubData.id,         
//     };


//     if(io){
//        io.emit('new_post',transformedMessageData);
//     }else{
//       console.log('new post')
//     }
   

//     res.status(200).json({
//       success: true,
//       message: "Message created!",
//       result: result
//     });

//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };


module.exports = {
    privateClubGet,
    privateJoinClubGet,
    privateGetClubs,
    getClubsJoined,
    getClubById,
    privatePostControllerGetTwo
}