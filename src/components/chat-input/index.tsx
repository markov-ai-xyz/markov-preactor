import { h, FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { ChatInputProps } from '../types';
import { chatInputStyles } from '../styles';

const ChatInput: FunctionComponent<ChatInputProps> = ({ onSendMessage, currentScreen }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: h.JSX.TargetedEvent<HTMLInputElement, Event>) => {
    setInputValue(event.currentTarget.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      console.log("Handling send message");
      console.log(inputValue);
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (event: h.JSX.TargetedKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div style={chatInputStyles.container}>
      <input
        type="text"
        placeholder={`Type your message as ${currentScreen}...`}
        value={inputValue}
        onInput={handleInputChange}
        onKeyPress={handleKeyPress}
        style={chatInputStyles.input}
      />
      <button
        onClick={handleSendMessage}
        style={chatInputStyles.button}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
