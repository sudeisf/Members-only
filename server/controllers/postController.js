

const db = require('../config/database');

const createPost = async (req,res)=>{

    const userID = req.user.id;
    const clubID = req.params.id;
    const message = req.body.content


    try{
        const result =  await db.query(
            `Insert Into messages (content, user_id,club_id) values ($1,$2,$3) returning *;`,
            [
                message,
                userID,
                clubID
            ]
        );

        const response = result.rows[0];
        if(response){
            res.status(200).json({
                success : true,
                message: "The post has been created successfully",
            });
        }
      
    }catch(err){
        res.status(400).json({
            success : false,
            message: "The post has not been created successfully",
        });

    }
}


const getPost = async (req,res)=>{
    try{
        const result =  await db.query(
            `Select * from messages where club_id = $1 and user_id = $2 order by sent_at desc;`,
            [
                req.params.id,
                req.user.id
            ]
        )

        const response = result.rows;

        res.status(200).json({
            success : true,
            message: "The post has been created successfully",
            data : response
        });
    }catch(err){
        res.status(400).json({
            success : false,
            message: "The post has not been created successfully",
        });
    }
}


const getAllPosts = async (req,res)=>{
    try{

        const result =  await db.query(
            `Select * from messages where user_id = $1 order by sent_at desc;`,
            [
                req.params.id
            ]
        )

        const response = result.rows;

        res.status(200).json({
            success : true,
            message: "The post has been created successfully",
            data : response
        });

    }catch(err){
        res.status(400).json({
            success : false,
            message: "The post has not been created successfully",
        });
    }
}


module.exports = {
    createPost,
    getPost
}