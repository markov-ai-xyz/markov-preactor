import { h, FunctionComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';

interface ChatbotPopupProps {
  isOpen: boolean;
  onSendMessage: (message: string) => void;
  messages: { isUser: boolean; text: string }[];
}

const ChatbotPopup: FunctionComponent<ChatbotPopupProps> = ({
  isOpen,
  onSendMessage,
  messages,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'chat' | 'menu' | 'settings'>('chat');

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

  const handleMinimizeToggle = () => {
    setIsMinimized(!isMinimized);
  };

  const handleScreenChange = (screen: 'chat' | 'menu' | 'settings') => {
    setCurrentScreen(screen);
  };

  return (
    <div
      className={`chatbot-popup ${isOpen ? 'open' : ''} ${isMinimized ? 'minimized' : ''}`}
      style={{
        position: 'fixed',
        bottom: isMinimized ? '20px' : '80px',
        right: '20px',
        width: isMinimized ? '60px' : '350px',
        height: isMinimized ? '60px' : '500px',
        maxHeight: '80vh',
        backgroundColor: 'white',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        overflow: 'hidden',
        zIndex: '9999',
      }}
    >
      {isMinimized ? (
        <div
          className="minimized-icon"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px 16px',
            backgroundColor: '#007bff',
            color: 'white',
          }}
        >
          <i className="fas fa-comment"></i>
        </div>
      ) : (
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
          <h3 style={{ margin: 0 }}>Chatbot</h3>
          <div>
            <button
              onClick={handleMinimizeToggle}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '20px',
                color: 'white',
              }}
            >
              {isMinimized ? '▲' : '▼'}
            </button>
          </div>
        </div>
      )}
      {!isMinimized && (
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
      )}
      {!isMinimized && (
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
          <div className="bottom-menu" style={{ display: 'flex' }}>
            <button
              onClick={() => handleScreenChange('chat')}
              style={{
                flex: '1',
                padding: '8px 12px',
                backgroundColor: currentScreen === 'chat' ? '#007bff' : '#f1f0f0',
                color: currentScreen === 'chat' ? 'white' : '#333',
                border: 'none',
                borderRadius: '16px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Chat
            </button>
            <button
              onClick={() => handleScreenChange('menu')}
              style={{
                flex: '1',
                padding: '8px 12px',
                backgroundColor: currentScreen === 'menu' ? '#007bff' : '#f1f0f0',
                color: currentScreen === 'menu' ? 'white' : '#333',
                border: 'none',
                borderRadius: '16px',
                cursor: 'pointer',
                fontSize: '14px',
                marginLeft: '12px',
              }}
            >
              Menu
            </button>
            <button
              onClick={() => handleScreenChange('settings')}
              style={{
                flex: '1',
                padding: '8px 12px',
                backgroundColor: currentScreen === 'settings' ? '#007bff' : '#f1f0f0',
                color: currentScreen === 'settings' ? 'white' : '#333',
                border: 'none',
                borderRadius: '16px',
                cursor: 'pointer',
                fontSize: '14px',
                marginLeft: '12px',
              }}
            >
              Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotPopup;
