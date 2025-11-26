import Chat from "./chat/Chat";
import Interaction from "./interaction/Interaction";
import "./home.css";
//import Video from "./video/Video";
import ParticipantsGrid from "./video/Video";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="left-panel">
        <div className="video-section">
          <ParticipantsGrid /> 
          {/* Aquí va el stream (puede ser video, cámara, etc.) */}
        </div>
        <div className="interaction-section">
          <Interaction />
        </div>
      </div>
      <div className="right-panel">
        <Chat />
      </div>
    </div>
  );
};

export default Home;