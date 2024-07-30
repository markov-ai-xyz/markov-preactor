import { h, FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import ChatbotPopup from './chat-popup';
import { ChatState, Location, Message } from './types';
import ActionProvider from './action-provider';

const App: FunctionComponent = () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }

  const [chatState, setChatState] = useState<ChatState>({
    applicant: [{ message: "Could you please provide your 10 digit phone number?", type: 'bot' }],
  });

  const resetChatState = () => {
    setChatState({
      applicant: [{ message: "Could you please provide your 10 digit phone number?", type: 'bot' }],
    });
  };

  const actionProvider = new ActionProvider('https://www.markovai.xyz', setChatState);

  const handleSendAudioMessage = async (audioBlob: Blob, screen: 'applicant') => {
    setChatState(prevState => ({
      ...prevState,
      [screen]: [...prevState[screen], { message: 'Audio message sent', type: 'user' }],
    }));

    try {
      console.log(audioBlob);
      await actionProvider.parseAudio(audioBlob, screen, chatState[screen]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLocationSelect = async (location: Location, screen: 'applicant') => {
    try {
      console.log(location);
      await actionProvider.parseLocation(location, screen);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSendMessage = async (message: string, screen: 'applicant') => {
    setChatState(prevState => ({
      ...prevState,
      [screen]: [...prevState[screen], { message, type: 'user' }],
    }));

    try {
      await actionProvider.parseMessage(message, screen, chatState[screen]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <ChatbotPopup
        onSendAudioMessage={handleSendAudioMessage}
        onSendLocation={handleLocationSelect}
        onSendMessage={handleSendMessage}
        chatState={chatState}
        resetChatState={resetChatState}
      />
    </div>
  );
};

export default App;
