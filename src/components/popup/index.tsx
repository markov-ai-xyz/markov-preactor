import { h, Fragment, FunctionComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import BottomMenu from '../footer'

interface ChatbotPopupProps {
  onSendMessage: (message: string) => void;
  messages: { isUser: boolean; text: string }[];
}

const ChatbotPopup: FunctionComponent<ChatbotPopupProps> = ({
  onSendMessage,
  messages,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [currentScreen, setCurrentScreen] = useState<'chat' | 'menu' | 'settings'>('chat');
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  useEffect(() => {
    const chatContent = document.querySelector('.chatbot-popup-content');
    if (chatContent) {
      chatContent.scrollTop = chatContent.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (event: h.JSX.TargetedEvent<HTMLInputElement, Event>) => {
    setInputValue(event.currentTarget.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (event: h.JSX.TargetedKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleScreenChange = (screen: 'chat' | 'menu' | 'settings') => {
    setCurrentScreen(screen);
  };

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  return (
    <div>
      {isChatbotVisible && (
        <div
          className={'chatbot-popup'}
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '350px',
            height: '500px',
            maxHeight: '80vh',
            backgroundColor: 'white',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
            borderRadius: '8px',
            overflow: 'hidden',
            zIndex: '9999',
          }}
        >
          <div
            className="chatbot-popup-header"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderBottom: '1px solid #e0e0e0',
              backgroundColor: '#007bff',
              color: 'white',
            }}
          >
            <h3 style={{ margin: 0 }}>Conversation with Markov</h3>
          </div>
          <div
            className="chatbot-popup-content"
            style={{
              padding: '16px',
              height: 'calc(100% - 170px)',
              overflowY: 'auto',
            }}
          >
            {currentScreen === 'chat' && (
              <div>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: message.isUser ? 'row-reverse' : 'row',
                      marginBottom: '12px',
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '70%',
                        padding: '8px 12px',
                        backgroundColor: message.isUser ? '#007bff' : '#f1f0f0',
                        color: message.isUser ? 'white' : '#333',
                        borderRadius: '16px',
                      }}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {currentScreen === 'menu' && (
              <div>
                <h3>Menu</h3>
                <ul>
                  <li onClick={() => handleScreenChange('chat')}>Chat</li>
                  <li onClick={() => handleScreenChange('settings')}>Settings</li>
                </ul>
              </div>
            )}
            {currentScreen === 'settings' && (
              <div>
                <h3>Settings</h3>
                <p>This is where you can configure your chatbot settings.</p>
              </div>
            )}
          </div>
          <div
            className="chatbot-popup-footer"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              padding: '12px 16px',
              borderTop: '1px solid #e0e0e0',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            {currentScreen === 'chat' && (
              <div style={{ display: 'flex', marginBottom: '12px' }}>
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={inputValue}
                  onInput={handleInputChange}
                  onKeyPress={handleKeyPress}
                  style={{
                    flex: '1',
                    padding: '8px 12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '16px',
                    fontSize: '14px',
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    marginLeft: '12px',
                    color: '#007bff',
                  }}
                >
                  Send
                </button>
              </div>
            )}
            <BottomMenu currentScreen={currentScreen} handleScreenChange={handleScreenChange}/>
          </div>
        </div>
      )}
      <button
        onClick={toggleChatbot}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '12px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          zIndex: '9999',
          width: '48px',
          height: '48px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {
            isChatbotVisible ?
            <Fragment>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </Fragment>
            : 
            <Fragment>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </Fragment>
          }
        </svg>
      </button>
    </div>
  );
};

export default ChatbotPopup;
