import { h, FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import ChatHeader from '../chat-header';
import ChatContent from '../chat-content';
import ChatInput from '../chat-input';
import ToggleButton from '../toggle-button';
import BottomMenu from '../chat-footer';
import { ChatbotPopupProps, Screen } from '../types';
import { chatbotPopupStyles } from '../styles';

const ChatbotPopup: FunctionComponent<ChatbotPopupProps> = ({
  onSendMessage,
  chatState,
  resetChatState,
}) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const handleScreenChange = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  const handleSendMessage = (message: string) => {
    if (currentScreen === 'applicant' || currentScreen === 'recruiter') {
      onSendMessage(message, currentScreen);
    }
  };

  return (
    <div>
      {isChatbotVisible && (
        <div style={chatbotPopupStyles.container}>
          <ChatHeader />
          <ChatContent
            chatState={chatState}
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
          />
          <div style={chatbotPopupStyles.footer}>
            {(currentScreen === 'applicant' || currentScreen === 'recruiter') && (
              <ChatInput 
                onSendMessage={handleSendMessage}
                currentScreen={currentScreen}
              />
            )}
            <BottomMenu
              currentScreen={currentScreen}
              handleScreenChange={handleScreenChange}
            />
          </div>
        </div>
      )}
      <ToggleButton
        isChatbotVisible={isChatbotVisible}
        toggleChatbot={toggleChatbot}
        resetChatState={resetChatState}
      />
    </div>
  );
};

export default ChatbotPopup;
