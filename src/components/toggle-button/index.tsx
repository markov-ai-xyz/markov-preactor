import { h, Fragment, FunctionComponent } from 'preact';
import { ToggleButtonProps } from '../types';
import { toggleButtonStyles } from '../styles';
import { cleanLocalStorage, validateApiKey } from '../utils';

interface ExtendedToggleButtonProps extends ToggleButtonProps {
  resetChatState: () => void;
}

const ToggleButton: FunctionComponent<ExtendedToggleButtonProps> = ({
  isChatbotVisible,
  toggleChatbot,
  resetChatState
}) => {
  const handleToggleChatbot = () => {
    toggleChatbot();
    if (!isChatbotVisible) {
      cleanLocalStorage();
      validateApiKey('mdp-erekrut');
      resetChatState();
    }
  };


  return (
    <button
      onClick={handleToggleChatbot}
      style={toggleButtonStyles.button}
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
        {isChatbotVisible ? (
          <Fragment>
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </Fragment>
        ) : (
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        )}
      </svg>
    </button>
  );
};

export default ToggleButton;
