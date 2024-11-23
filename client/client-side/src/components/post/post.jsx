
import { useState } from "react";

const Post =( {message , timestamp , clubID, clubName , userID})=>{
    cosnt [userInfo , setUserInfo] = useState({
        username : '',
        Email: '',
        timestamp: ''
    });

    const [clubInfo , setClubInfo] = useState({
        clubName : '',
        clubID: ''
    });
    

    const someFunction = () => {

    }



    return (
       <div>

        <div id="userProfileInfo">

            <div id="avatarInfo">

                <div id="avatar">
                    <img src="" alt="avater profile pic" />
                </div>

                <div id="userInfo">
                    <h1>username</h1>
                    <p>email@email.com</p>
                    <p>timestamp</p>
                </div>

            </div>

            <div id="userOption" className="realtive">
                <button onClick={someFunction}>
                    
                </button>

                <div id="thingsTobeDisaplayed" className="hidden">
                    <ul>
                        <li>option 2</li>
                        <li>otpion 2</li>
                    </ul>
                </div>
            </div>
        </div>


        <div>
            <div id="textMessage">
                <p>message</p>
            </div>

            <div id="clubDetail">
                <img src="" alt="clubIcon" />
                <p>club name</p>
            </div>  
        </div>

       </div>
    )
}

export default Post