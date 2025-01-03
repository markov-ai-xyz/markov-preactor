import { h, FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import ChatHeader from '../chat-header';
import ChatContent from '../chat-content';
import ChatInput from '../chat-input';
import ToggleButton from '../toggle-button';
import BottomMenu from '../chat-footer';
import { ChatbotPopupProps, Location, Screen } from '../types';
import { chatbotPopupStyles } from '../styles';

const ChatbotPopup: FunctionComponent<ChatbotPopupProps> = ({
  onSendAudioMessage,
  onSendLocation,
  onSendMessage,
  chatState,
  resetChatState,
}) => { 
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isChecked, setIsChecked] = useState(false);
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const handleScreenChange = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  const handleSendAudioMessage = (audioBlob: Blob) => {
    if (currentScreen === 'applicant') {
      onSendAudioMessage(audioBlob, currentScreen);
    }
  };

  const handleSendLocation = (location: Location) => {
    if (currentScreen === 'applicant') {
      onSendLocation(location, currentScreen);
    }
  };

  const handleSendMessage = (message: string) => {
    if (currentScreen === 'applicant') {
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
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
          <div style={chatbotPopupStyles.footer}>
            {(currentScreen === 'applicant') && (
              <ChatInput
                onSendAudioMessage={handleSendAudioMessage}
                onSendLocation={handleSendLocation}
                onSendMessage={handleSendMessage}
                currentScreen={currentScreen}
              />
            )}
            <BottomMenu
              currentScreen={currentScreen}
              handleScreenChange={handleScreenChange}
              isChecked={isChecked}
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
