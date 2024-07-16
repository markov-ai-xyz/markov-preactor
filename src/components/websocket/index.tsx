import { useState, useEffect } from 'preact/hooks';

const useWebSocket = (url, onMessage) => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => console.log('WebSocket connected');
    socket.onclose = () => console.log('WebSocket disconnected');
    socket.onerror = (error) => console.error('WebSocket error:', error);
    socket.onmessage = onMessage;

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [url, onMessage]);

  const sendMessage = (message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    }
  };

  return sendMessage;
};

export default useWebSocket;
