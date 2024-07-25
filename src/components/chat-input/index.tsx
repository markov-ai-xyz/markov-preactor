import { h, FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { ChatInputProps } from '../types';
import { chatInputStyles } from '../styles';
import AudioRecorder from '../audio-recorder';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

const ChatInput: FunctionComponent<ChatInputProps> = ({ onSendAudioMessage, onSendMessage, currentScreen }) => {
  const [inputValue, setInputValue] = useState('');

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

  return (
    <div style={chatInputStyles.container}>
      <input
        type="text"
        placeholder="Please enter your message..."
        value={inputValue}
        onInput={handleInputChange}
        onKeyPress={handleKeyPress}
        style={chatInputStyles.input}
      />
      <AudioRecorder onAudioMessage={onSendAudioMessage} />
      <IconButton
        onClick={handleSendMessage}
        style={chatInputStyles.button}
        aria-label="send"
      >
        <SendIcon />
      </IconButton>
    </div>
  );
};

export default ChatInput;
