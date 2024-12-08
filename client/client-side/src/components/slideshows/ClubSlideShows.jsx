import music from '../../../src/assets/club-photos/music.jpg'
import photo from '../../../src/assets/club-photos/photography.jpg'
import robot from '../../../src/assets/club-photos/robot.jpg'
import science from '../../../src/assets/club-photos/science.jpg'
import art from '../../../src/assets/club-photos/art.jpg'
import book from '../../../src/assets/club-photos/book.jpg'
import chess from '../../../src/assets/club-photos/chess.jpg'
import debate from '../../../src/assets/club-photos/debate.jpg'
import drama from '../../../src/assets/club-photos/drama.jpg'
import food from '../../../src/assets/club-photos/cooking.jpg'

const ClubSlideShows = () => {
    return (
        <div className='flex flex-col dark:bg-[#1F2937] bg-[#F3F4F6] h-[40rem]'>
        <div className="carousel w-[70vw] h-fit mx-auto ">
            <div id="item1" className="carousel-item w-full  ">

                <img
                src={music}
                className="w-full" />
            </div>

            <div id="item2" className="carousel-item w-full">
                <img
                src={robot}
                className="w-full" />
            </div>

            <div id="item3" className="carousel-item w-full">
                <img
                src={debate}
                className="w-full" />
            </div>

            <div id="item4" className="carousel-item w-full">
                <img
                src={chess}
                className="w-full" />
            </div>

            <div id="item5" className="carousel-item w-full">
                <img
                src={drama}
                className="w-full" />
            </div>

            <div id="item6" className="carousel-item w-full">
                <img
                src={book}
                className="w-full" />
            </div>

            <div id="item7" className="carousel-item w-full">
                <img
                src={food}
                className="w-full" />
            </div>

            <div id="item8" className="carousel-item w-full">
                <img
                src={science}
                className="w-full" />  
                </div>

                <div id="item9" className="carousel-item w-full">
                <img
                src={art}
                className="w-full" />
            </div> 

            <div id="item10" className="carousel-item w-full">
                <img
                src={photo}
                className="w-full" />
            </div>


            
            </div>

            <div className="flex w-full justify-center gap-2 py-2">
                <a href="#item1" className="btn btn-xs">1</a>
                <a href="#item2" className="btn btn-xs">2</a>
                <a href="#item3" className="btn btn-xs">3</a>
                <a href="#item4" className="btn btn-xs">4</a>
            </div>
        </div>
    )
}


export default ClubSlideShows;