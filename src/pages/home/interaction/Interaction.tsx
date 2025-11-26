import { useState, useCallback, useRef } from "react";
import { disableOutgoingStream, disableOutgoingVideo, enableOutgoingStream, enableOutgoingVideo, initWebRTC } from "../../../webrtc/webrtc.js";
import "./interaction.css";
/**
 * Component for controlling voice input/output.
 * @returns {JSX.Element} The JSX.Element containing the voice control button.
 */
export default function Interaction() {
  const [isSpeaking, setIsSpeaking] = useState(false); // State to track if the user is speaking
  const [callPeers, setCallPeers] = useState(true); // State to track if peers should be called

  const [videoOn, setVideoOn] = useState(true);
  //const [isStreamReady, setIsStreamReady] = useState(false);

 // Function to start speaking
  const speak = useCallback(async () => {
    setIsSpeaking(true);

    if (callPeers) {
      setCallPeers(false);
      await initWebRTC();   // Inicia la conexión WebRTC
    }
    enableOutgoingStream(); // Activa el micro para transmisión
  }, [callPeers]);

  const stop = useCallback(() => {
    setIsSpeaking(false);
    disableOutgoingStream(); // Mutea el stream transmitido
  }, []);

  // Función para iniciar la cámara
  const startVideo = useCallback(async () => {
    enableOutgoingVideo();
    setVideoOn(true);
  }, []);

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