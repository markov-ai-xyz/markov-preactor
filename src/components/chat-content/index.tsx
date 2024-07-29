import { h, FunctionComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { ChatContentProps, Message } from '../types';
import { chatContentStyles, homeScreenStyles } from '../styles';
import { articles, Article } from '../articles';

const ChatContent: FunctionComponent<ChatContentProps> = ({
  chatState,
  currentScreen,
  setCurrentScreen,
  isChecked,
  setIsChecked
}) => {
  useEffect(() => {
    const chatContent = document.querySelector('.chatbot-popup-content');
    if (chatContent && (currentScreen === 'applicant')) {
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
      { name: 'Register now 🚀', description: 'Sign up as an applicant!', id: 'applicant' },
      { name: 'Browse articles 📰', description: 'Catch up on the latest!', id: 'articles' },
    ];

    const handleCardClick = (screenId) => {
      if (screenId !== 'applicant' || isChecked) {
        setCurrentScreen(screenId);
      }
    };

    return (
      <div style={homeScreenStyles.homeScreenContainer}>
        {screens.map((screen) => (
          <div
            key={screen.id}
            style={{
              ...homeScreenStyles.homeScreenCard,
              backgroundColor: screen.id === 'applicant' 
                ? (isChecked ? '#f5f5f5' : '#d3d3d3') // Duller shade until accepted
                : '#f5f5f5', // Default background color for other cards
            }}
            onMouseEnter={(e) => {
              if (screen.id === 'applicant' && !isChecked) {
                e.currentTarget.style.backgroundColor = '#c0c0c0'; // Lighter shade on hover for unaccepted
              } else {
                e.currentTarget.style.backgroundColor = '#e0e0e0'; // Normal hover for accepted
              }
            }} 
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = screen.id === 'applicant' 
                ? (isChecked ? '#f5f5f5' : '#d3d3d3') 
                : '#f5f5f5'; // Revert to appropriate color
            }}
            onClick={() => handleCardClick(screen.id)}
          >
            <h3 style={homeScreenStyles.homeScreenCardTitle}>{screen.name}</h3>
            <p style={homeScreenStyles.homeScreenCardDescription}>
              {screen.description}
            </p>
            {screen.id === 'applicant' && (
              <div style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)} // Toggle checkbox state
                  style={styles.checkbox}
                />
                <label style={styles.checkboxLabel}>I accept the <a href="https://www.erekrut.com/terms-conditions/">terms & conditions</a></label>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const styles = {
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '10px',
    },
    checkbox: {
      width: '20px',
      height: '20px',
      marginRight: '10px',
      cursor: 'pointer',
      accentColor: '#007bff',
    },
    checkboxLabel: {
      fontSize: '14px',
      color: '#555',
      cursor: 'pointer',
      transition: 'color 0.3s ease',
    },
  };

  return (
    <div style={chatContentStyles.container} className="chatbot-popup-content">
      {currentScreen === 'home' && (
        <div>
          {renderHomeScreenCards()}
        </div>
      )}
      {currentScreen === 'applicant' && renderMessages(chatState.applicant)}
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
