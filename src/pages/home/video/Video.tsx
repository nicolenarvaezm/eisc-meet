import { useEffect, useState, useRef } from "react";
import { getRemoteStreams, getLocalMediaStream } from "../../../webrtc/webrtc.js";

type Participant = {
  id: string;
  stream: MediaStream;
  isLocal?: boolean;
};

export default function ParticipantsGrid() {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const map = getRemoteStreams(); // remotos
      const list: Participant[] = Object.entries(map).map(([id, stream]) => ({
        id,
        stream: stream as MediaStream,
      }));

      const localStream = getLocalMediaStream();
      if (localStream) {
        list.unshift({
          id: "yo",
          stream: localStream,
          isLocal: true,
        });
      }

      setParticipants(list);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "12px",
        width: "100%",
      }}
    >
      {participants.map((p) => (
        <VideoTile key={p.id} participant={p} />
      ))}
    </div>
  );
}

function VideoTile({ participant }: { participant: Participant }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = participant.stream;
    }
  }, [participant.stream]);

  return (
    <div
      style={{
        position: "relative",
        background: "#111",
        borderRadius: 8,
        overflow: "hidden",
        aspectRatio: "16 / 9",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={participant.isLocal} // no eco en el local
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 4,
          left: 8,
          padding: "2px 6px",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          fontSize: 12,
          borderRadius: 4,
        }}
      >
        {participant.isLocal ? "Tú" : participant.id}
      </div>
    </div>
  );
}
