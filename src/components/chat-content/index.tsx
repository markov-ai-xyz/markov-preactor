import { h, FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { ChatContentProps, Message } from '../types';
import { chatContentStyles, homeScreenStyles } from '../styles';
import { articles, Article } from '../articles';

const ChatContent: FunctionComponent<ChatContentProps> = ({
  chatState,
  currentScreen,
  setCurrentScreen,
}) => {
  useEffect(() => {
    const chatContent = document.querySelector('.chatbot-popup-content');
    if (chatContent && (currentScreen === 'applicant' || currentScreen === 'recruiter')) {
      chatContent.scrollTop = chatContent.scrollHeight;
    }
  }, [chatState]);

  const renderMessages = (messages: Message[]) => (
    messages.map((message, index) => (
      <div key={index} style={{
          ...chatContentStyles.messageContainer,
          flexDirection: message.type === 'user' ? 'row-reverse' : 'row',
      }}>
        <div style={{
            ...chatContentStyles.message,
            backgroundColor: message.type === 'user' ? '#007bff' : '#f1f0f0',
            color: message.type === 'user' ? 'white' : '#333',
        }}>
          {message.message}
        </div>
      </div>
    ))
  );

  const renderArticleCards = () => {
    return (
      <div style={chatContentStyles.articleContainer}>
        {articles.map((article: Article) => (
          <a key={article.id} href={article.link} target="_blank" rel="noopener noreferrer" style={chatContentStyles.articleCard}>
            <h4 style={chatContentStyles.articleTitle}>{article.title}</h4>
            <p style={chatContentStyles.articleDescription}>{article.description}</p>
            <p style={chatContentStyles.articleReadMore}>Read more →</p>
          </a>
        ))}
      </div>
    );
  };

  const renderHomeScreenCards = () => {
    const screens = [
      { name: 'Applicant', id: 'applicant' },
      { name: 'Recruiter', id: 'recruiter' },
      { name: 'Articles', id: 'articles' },
    ];

    return (
      <div style={homeScreenStyles.homeScreenContainer}>
        {screens.map((screen) => (
          <div
            key={screen.id}
            style={homeScreenStyles.homeScreenCard}
            onClick={() => setCurrentScreen(screen.id)}
          >
            <h3 style={homeScreenStyles.homeScreenCardTitle}>{screen.name}</h3>
            <p style={homeScreenStyles.homeScreenCardDescription}>
              Go to {screen.name} section
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={chatContentStyles.container} className="chatbot-popup-content">
      {currentScreen === 'home' && (
        <div>
          <h3 style={homeScreenStyles.homeScreenTitle}>Welcome to the Chatbot</h3>
          {renderHomeScreenCards()}
        </div>
      )}
      {currentScreen === 'applicant' && renderMessages(chatState.applicant)}
      {currentScreen === 'recruiter' && renderMessages(chatState.recruiter)}
      {currentScreen === 'articles' && (
        <div>
          <h3 style={chatContentStyles.articlesSectionTitle}>Latest Updates</h3>
          {renderArticleCards()}
        </div>
      )}
    </div>
  );
};

export default ChatContent;
