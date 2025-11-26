import { useState, useCallback, useRef } from "react";
import { disableOutgoingStream, disableOutgoingVideo, enableOutgoingStream, enableOutgoingVideo, initWebRTC } from "../../../webrtc/webrtc.js";
import "./interaction.css";
/**
 * Component for controlling voice input/output.
 * @returns {JSX.Element} The JSX.Element containing the voice control button.
 */
export default function Interaction() {
  const [isSpeaking, setIsSpeaking] = useState(false); // State to track if the user is speaking

  const [videoOn, setVideoOn] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const ensureInit = useCallback(async () => {
    if (!isInitialized) {
      await initWebRTC();       
      setIsInitialized(true);
    }
  }, [isInitialized]);

 // Audio
  const speak = useCallback(async () => {
    await ensureInit();        
    enableOutgoingStream();
    setIsSpeaking(true);
  }, [ensureInit]);

  const stop = useCallback(() => {
    setIsSpeaking(false);
    disableOutgoingStream(); 
  }, []);

  // Video
  const startVideo = useCallback(async () => {
    await ensureInit();         
    enableOutgoingVideo();
    setVideoOn(true);
  }, [ensureInit]);

  // Función para apagar la cámara
  const stopVideo = useCallback(() => {
    disableOutgoingVideo();
    setVideoOn(false);
  }, []);

  return (
    <div className="container-page-meet">
      <div className="flex flex-row gap-4 w-full justify-center">
        <div className="button-speak">
          <button onClick={isSpeaking ? stop : speak}>
            {isSpeaking ? "Mutear" : "Hablar" }
          </button>
        </div>
        <div className="button-video">
          <button onClick={videoOn ? stopVideo : startVideo}>
            {videoOn ? "Apagar cámara" : "Prender cámara"}
          </button>
        </div>
      </div>
    </div>
  );
}