import { h, FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import ChatbotPopup from './chat-popup';
import { ChatState, Message } from './types';
import ActionProvider from './action-provider';

const App: FunctionComponent = () => {
  const [chatState, setChatState] = useState<ChatState>({
    applicant: [{ message: "How can I help you?", type: 'bot' }],
    recruiter: [{ message: "How can I help you?", type: 'bot' }],
  });

  const actionProvider = new ActionProvider('https://www.markovai.xyz');

  const handleSendMessage = async (message: string, screen: 'applicant' | 'recruiter') => {
    setChatState(prevState => ({
      ...prevState,
      [screen]: [...prevState[screen], { message, type: 'user' }],
    }));

    try {
      const response = await actionProvider.sendMessage(message, screen, chatState[screen]);

      setChatState(prevState => ({
        ...prevState,
        [screen]: [...prevState[screen], { message: response, type: 'bot' }],
      }));
    } catch (error) {
      console.error('Error:', error);
    }
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
