import { h, FunctionComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Route, Router } from 'preact-router';
import ChatbotPopup from './popup';
import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';

const App: FunctionComponent = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [messages, setMessages] = useState<{ isUser: boolean; text: string }[]>([]);

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleSendMessage = (message: string) => {
    setMessages([...messages, { isUser: true, text: message }]);
    const botResponse = 'This is a sample bot response.';
    setMessages([...messages, { isUser: true, text: message }, { isUser: false, text: botResponse }]);
  };

  return (
    <div>
      <Header />
      <ChatbotPopup
        isOpen={isPopupOpen}
        onSendMessage={handleSendMessage}
        messages={messages}
      />
    </div>
  );
};

export default App;
