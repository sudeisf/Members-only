const db  = require('../config/database');


const privatePostControllerGet = (req, res) =>{

}
const  privatePostControllerPost= (req, res) =>{

}

const  privateClubGet= async (req, res) =>{
    try{
        const result = await db.query('select * from clubs ;');
        const club = result.rows;
        res.status(200).json(
            {
                success: true,
                club : club,
                url : 'protected/club'
            }
        );
    }catch(err){
         res.status(401).json({
            success: false,
            msg : "error extractiing club"
         })
    }

}

const privateJoinClubGet = (req,res) =>{

}

const privateClubPostGet =(req,res)=>{

}


module.exports = {
    privatePostControllerGet,
    privatePostControllerPost,
    privateClubGet,
    privateJoinClubGet,
    privateClubPostGet
}