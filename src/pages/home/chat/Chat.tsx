import React, { useEffect, useRef, useState } from "react";
import { socket } from "../../../sockets/socketManager";
import useAuthStore from "../../../stores/useAuthStore";


const Home: React.FC = () => {
  const { user } = useAuthStore();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string; time: string }[]>([]);

  useEffect(() => {
    if (!user) return;
    socket.emit("newUser", user.displayName ?? "");

    socket.on("receiveMessage", (data: any) => {
      
      const normalized = {
        sender: data.sender,
        text: data.text,
        time: data.time ?? new Date().toISOString(),
      };
      setMessages((prev) => [...prev, normalized]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [user]);

  const handleSend = () => {
    if (!message.trim() || !user) return;
  const msgData = { sender: user.displayName ?? "Anon", text: message, time: new Date().toISOString() };
  socket.emit("sendMessage", msgData);
    //setMessages(prev => [...prev, msgData]);
    setMessage("");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4" style={{marginBottom: "3rem", marginTop: "1rem"}}>Chat en tiempo real</h1>

      <div className="border rounded p-4 h-64 overflow-y-auto bg-white" style={{ marginLeft: "5rem", marginRight: "5rem", marginBottom: "1rem" }}>
        {messages.map((msg, i) => {
          const isLocal = user && msg.sender === user.displayName;
          return (
            <div key={i} className={`mb-3 flex ${isLocal ? "justify-end" : "justify-start"}`}>
              <div className="max-w-[70%]">
                {isLocal ? (
                  // Usuario local (derecha)
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">
                      {msg.sender}
                      
                    </div>
                    
                    <div className="inline-block bg-teal-600 text-white px-4 py-2 rounded-lg">
                      {msg.text}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{new Date(msg.time).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                  
                ) : (
                  // No local (izquierda)
                  <div className="text-left">
                    <div className="text-sm font-semibold text-teal-600 mb-1">{msg.sender}</div>
                    <div className="inline-block bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                      {msg.text}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{new Date(msg.time).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex gap-2" style={{ marginLeft: "5rem", marginRight: "5rem", marginBottom: "1rem" }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-1 flex-1 rounded"
          placeholder="Escribe un mensaje..."
        />
        <button onClick={handleSend} className="text-white px-3 rounded">
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Home;