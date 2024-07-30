import { h, FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { ChatInputProps, Location } from '../types';
import { chatInputStyles } from '../styles';
import AudioRecorder from '../audio-recorder';
import LocationInput from '../location-input';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

const ChatInput: FunctionComponent<ChatInputProps> = ({ onSendAudioMessage, onSendLocation, onSendMessage, currentScreen }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{ address: string; lat: number; lng: number } | null>(null);

  const handleLocationSelect = (location: { address: string; lat: number; lng: number }) => {
    onSendLocation(location);
  };

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
        placeholder="Enter your message..."
        value={inputValue}
        onInput={handleInputChange}
        onKeyPress={handleKeyPress}
        style={chatInputStyles.input}
      />
      <LocationInput 
        apiKey="R35APXgJlCHre8BK5gFiNM2ZaNF8RZH1TPTct8Gb" 
        onLocationSelect={handleLocationSelect} 
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
