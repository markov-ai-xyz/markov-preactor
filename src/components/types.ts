export type Screen = 'home' | 'applicant' | 'articles';

export interface ChatState {
  applicant: Message[];
}

export interface Message {
  message: string;
  type: 'bot' | 'user';
}

export interface ChatbotPopupProps {
  onSendAudioMessage: (audioBlob: Blob, screen: 'applicant') => void;
  onSendMessage: (message: string, screen: 'applicant') => void;
  chatState: ChatState;
  resetChatState: () => void;
}

export interface ChatContentProps {
  chatState: ChatState;
  currentScreen: Screen;
  setCurrentScreen: (string) => void;
}

export interface ChatInputProps {
  onSendAudioMessage: (audioBlob: Blob) => void;
  onSendMessage: (message: string) => void;
  currentScreen: 'applicant';
}

export interface ToggleButtonProps {
  isChatbotVisible: boolean;
  toggleChatbot: () => void;
}
