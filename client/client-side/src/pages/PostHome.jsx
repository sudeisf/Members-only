import Post from "../components/post";
import Posts from "../components/posts";
import MakePost from "../components/post/makePost";
import ClubSideline from "../components/post/clubSlideline";

const PostHome = () => {




  

    const messages = [
        {
          message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a felis in  ex. Vivamus in suscipit magna. Nulla facilisi. Sed a laoreet arcu. Nam accumsan sem quis erat cursus, nec laoreet velit convallis. Praesent vehicula, eros non sodales luctus, quam risus scelerisque erat, et faucibus elit urna ut nunc. Integer ut nunc nec sem venenatis ultricies. Morbi id lacus orci. Curabitur sed velit vitae metus viverra gravida. Fusce sed tortor quis nisi dapibus dapibus. Integer ultricies lorem sed feugiat fermentum.",
          timestamp: "2024-08-26T12:00:00Z"
        },
        {
          message: "Sed dignissim nisi a justo feugiat, ac condimentum sapien gravida. Integer faucibus leo a facilisis sodales. Pr, magna eros luctus quam, sed sagittis lacus dolor ut est. Mauris consectetur erat sed egestas tristique. Integer sagittis nisi ac facilisis tincidunt. Pellentesque vitae augue in felis tincidunt dignissim. Aliquam erat volutpat. Ut vehicula risus nec quam pretium, a eleifend odio volutpat. Fusce at est id risus cursus pharetra. Ut non turpis eget elit vestibulum facilisis. Sed fringilla enim at diam elementum, sit amet aliquet est ullamcorper.",
          timestamp: "2024-08-26T13:00:00Z"
        },
        {
          message: "Phasellus vehicula nisl at mauris pretium, a auctor lorem euismod. Proin sollicitudin sem et nisi gravida, eget sodales. Integer scelerisque elit ut erat gravida, at fermentum nisi aliquet. Nullam vitae orci sit amet lectus suscipit scelerisque ut eu lacus.",
          timestamp: "2024-08-26T14:00:00Z"
        },
        {
          message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pretium nibh sit amet sapien tincidunt, ac ult. Vivamus feugiat est eu magna vulputate convallis. Donec ut mi nec sapien convallis cursus. Mauris ac nisl ac mi bibendum accumsan. Pellentesque nec elit a nisi condimentum fermentum.",
          timestamp: "2024-08-26T15:00:00Z"
        },
        {
          message: "Donec vulputate nisl ut metus dictum, eu vehicula sapien accumsan. Fusce ultrices, metus a bibendum sollicitudi. In a risus sit amet lorem dictum feugiat. Duis nec nisi nec elit vulputate cursus eget ut orci. Suspendisse potenti. Nulla facilisi.",
          timestamp: "2024-08-26T16:00:00Z"
        },
        {
          message: "Vivamus vel nunc euismod, commodo elit ut, luctus mi. Nam at ligula nec augue suscipit posuere. Pellentesque su massa vitae odio consectetur gravida. Fusce et neque ac eros aliquet consectetur. Cras a nisl a libero gravida eleifend.",
          timestamp: "2024-08-26T17:00:00Z"
        },
        {
          message: "Mauris facilisis tortor sit amet nisl consequat, ac tincidunt justo feugiat. Curabitur id lectus non erat sagit nunc. Etiam cursus libero in ligula sollicitudin gravida. Nam gravida lacus sit amet enim cursus feugiat. Cras mollis nisl et massa vehicula, sed rhoncus justo ultricies. Quisque nec massa id elit gravida faucibus. Ut eu justo nec ante auctor dignissim. Sed vitae urna et justo tempor tincidunt.",
          timestamp: "2024-08-26T18:00:00Z"
        },
        {
          message: "Integer gravida, libero eget vehicula imperdiet, est purus dictum nisl, sed vulputate eros lorem sed dui. Proin vestibulum ligula maximus. Morbi pretium magna id mi tempor, sit amet tempus nisl consequat.",
          timestamp: "2024-08-26T19:00:00Z"
        },
        {
          message: "Curabitur volutpat, tortor vel condimentum volutpat, arcu elit varius nisi, ac egestas dui metus et eros. Phase Nam eu lectus a urna ultrices consectetur. Nullam facilisis, lacus et sollicitudin efficitur, orci lorem volutpat sapien, ut suscipit metus lorem vel lectus. Vivamus sit amet sapien lacinia, gravida risus vel, posuere nunc.",
          timestamp: "2024-08-26T20:00:00Z"
        },
        {
          message: "Fusce auctor elit a turpis accumsan, ac tristique sem ullamcorper. Ut egestas dui at ipsum tempor, vel sagittis justo sollicitudin venenatis. Nam ornare lacus nec nunc dapibus, ac eleifend sapien sollicitudin. Sed at sapien ac velit maximus fermentum. Donec ut odio a ipsum commodo vehicula.",
          timestamp: "2024-08-26T21:00:00Z"
        },
        {
          message: "Sed a risus id ante congue commodo. Cras ut lacus sed lacus egestas condimentum. Vivamus sit amet nisl et risus maximus ligula eu, auctor velit. Pellentesque id nisi tincidunt, posuere lorem sed, scelerisque ipsum.",
          timestamp: "2024-08-26T22:00:00Z"
        },
        {
          message: "Curabitur nec orci ut nunc pharetra cursus. Pellentesque ut libero nec lacus ullamcorper gravida. Aenean vehicu. Vivamus id lacus ut ipsum volutpat viverra. Integer vestibulum, libero eu dictum sagittis, mauris urna ornare risus, eget dictum ligula augue a risus.",
          timestamp: "2024-08-26T23:00:00Z"
        },
        {
          message: "Nam ac magna ut lectus efficitur consequat. Proin in metus at ante tincidunt vehicula. Integer condimentum urna ac ex maximus, in dictum felis fermentum. Phasellus ac elit quis felis fermentum fermentum.",
          timestamp: "2024-08-27T00:00:00Z"
        },
        {
          message: "Cras interdum, tortor a sodales scelerisque, lectus odio posuere ligula, a posuere arcu ligula non arcu. Phasel elit efficitur aliquet. Aliquam ac lorem ut mauris tempus vehicula.",
          timestamp: "2024-08-27T01:00:00Z"
        } 
    ]

    


    return ( 
            <div className="bg-[#fefefe] dark:bg-[#111827]">
                <ClubSideline  />
            
            <div 
             className="grid grid-cols-3  2xl:px-16 xl:px-10 [scrollbar-width:none] mt-2 pt-2 bg-[#fefefe] dark:bg-[#111827] gap-x-3 gap-y-4 w-[70%] md:w-full ml-auto mr-auto min-h-screen overflow-y-scroll h-[70vh] shadow-lg border-[1px]">
                {messages.slice(0,9).map((msg, index) => (
                    <Post key={index} data={msg}/>
                ))}
                </div>
            </div>

        
       )
}

export default PostHome;














