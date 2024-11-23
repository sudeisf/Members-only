import  {useState} from 'react';
const MakePost = () => {

    const [messge , setMessage] = useState('');

    const submitAction = (e) => {
        e.preventDefault();


    }

    return (    
       <div>
            <div id="userDetails">
                   <div id="profilePic" className="">
                     <img src="" alt="avatar profile image" />
                   </div>

                   <div id="userInfo">
                    <h3>username</h3>
                    <p>email@email.com</p>
                   </div>

                   <div>
                    <img src="" alt="" />
                    <p>club name</p>
                   </div>
                </div>

                <div id="postForm">
                    <form action="submitAction" method="post">
                        <input 
                        type="text" 
                        name="postMessage" 
                        id="userPost" 
                        placeholder="What's on your mind?" 
                        onChange={(e) => setMessage(e.target.value)} />
                        <button type="submit">+</button>
                    </form>
                </div>

        </div>
        )
}


export default MakePost;