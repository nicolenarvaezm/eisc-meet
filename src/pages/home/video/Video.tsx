import { useEffect, useState, useRef } from "react";
import { getLocalMediaStream } from "../../../webrtc/webrtc.js";

export default function VideoView() {
  // Nota: HTMLVideoElement | null para que TS acepte el ref
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isStreamReady, setIsStreamReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const stream = getLocalMediaStream();
      if (
        stream &&
        stream.getVideoTracks().length > 0 &&
        videoRef.current
      ) {
        videoRef.current.srcObject = stream;
        setIsStreamReady(true);
        clearInterval(interval);
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        muted
        style={{ width: 320, height: 240, background: "#222" }}
      />
      {!isStreamReady && <div>Esperando acceso a la cámara...</div>}
    </div>
  );
}
