import { h, FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import ChatbotPopup from './chat-popup';
import { ChatState } from './types';

const App: FunctionComponent = () => {
  const [chatState, setChatState] = useState<ChatState>({
    applicant: [],
    recruiter: [],
  });

  const handleSendMessage = (message: string, screen: 'applicant' | 'recruiter') => {
    setChatState(prevState => {
      const updatedMessages = [
        ...prevState[screen],
        { isUser: true, text: message },
      ];

      const botResponse = `This is a sample bot response for ${screen}.`;
      updatedMessages.push({ isUser: false, text: botResponse });

      return {
        ...prevState,
        [screen]: updatedMessages,
      };
    });
  };

  return (
    <div>
      <ChatbotPopup
        onSendMessage={handleSendMessage}
        chatState={chatState}
      />
    </div>
  );
};

export default App;
