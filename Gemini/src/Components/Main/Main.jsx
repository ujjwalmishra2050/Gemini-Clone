
import './Main.css'
import { assets } from '../../../assets/assets'
const Main = () => {
  return (
    
    <div className='main'>
    <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="user-icon"/>
    </div>
     <div className="main-container">
        <div className="greet">
        <p>Hello , Dev</p>
        <p>How Can Ihelp You?</p>
        </div>
        <div className="cards">
        <div className="card">
         <p>Suggest Beautiful Places To See On An Upcoming Road Trip</p>
        <img src={assets.compass_icon} alt="compass Icon" />
        </div>

          <div className="card">
         <p>Briefly Summarize This Concept : Urban Planning</p>
        <img src={assets.bulb_icon} alt="compass Icon" />
        </div>

          <div className="card">
         <p>Brainstorm Team Bonding activities for our work retreat</p>
        <img src={assets.message_icon} alt="compass Icon" />
        </div>

          <div className="card">
         <p>Improve The Readability Of The Following Code</p>
        <img src={assets.code_icon} alt="compass Icon" />
        </div>
        </div>

        <div className="main-bottom">
            <div className="search-box">
             <input type="text" placeholder='Enter A Prompt here' />   
            </div>
            <img src={assets.gallery_icon} alt="" />
            <img src={assets.mic_icon} alt="" />
            <img src={assets.send_icon} alt="" />
        </div>
        </div>
        <p className="bottom-info">
         Gemini May Display Inaccurate Info ,including about people , so double check its responses .Your Privacy And Gemini Apps   
        </p>
    </div>
    
  )
}

export default Main