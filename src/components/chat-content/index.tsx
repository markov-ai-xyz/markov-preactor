import { h, FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { ChatContentProps } from '../types';
import { chatContentStyles } from '../styles';

const ChatContent: FunctionComponent<ChatContentProps> = ({
  chatState,
  currentScreen,
}) => {
  useEffect(() => {
    const chatContent = document.querySelector('.chatbot-popup-content');
    if (chatContent) {
      chatContent.scrollTop = chatContent.scrollHeight;
    }
  }, [chatState]);

  const renderMessages = (messages: { isUser: boolean; text: string }[]) => (
    messages.map((message, index) => (
      <div
        key={index}
        style={{
          ...chatContentStyles.messageContainer,
          flexDirection: message.isUser ? 'row-reverse' : 'row',
        }}
      >
        <div
          style={{
            ...chatContentStyles.message,
            backgroundColor: message.isUser ? '#007bff' : '#f1f0f0',
            color: message.isUser ? 'white' : '#333',
          }}
        >
          {message.text}
        </div>
      </div>
    ))
  );

  return (
    <div style={chatContentStyles.container} className="chatbot-popup-content">
      {currentScreen === 'applicant' && renderMessages(chatState.applicant)}
      {currentScreen === 'recruiter' && renderMessages(chatState.recruiter)}
      {currentScreen === 'articles' && (
        <div>
          <h3>News</h3>
          <p>This is where you can configure your chatbot settings.</p>
        </div>
      )}
    </div>
  );
};

export default ChatContent;
