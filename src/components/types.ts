export type Screen = 'home' | 'applicant' | 'recruiter' | 'articles';

export interface ChatState {
  applicant: { message: string; type: 'bot' | 'user' }[];
  recruiter: { message: string; type: 'bot' | 'user' }[];
}

export interface Message {
  message: string;
  type: 'bot' | 'user';
}

export interface ChatState {
  applicant: Message[];
  recruiter: Message[];
}

export interface ChatbotPopupProps {
  onSendAudioMessage: (audioBlob: Blob, screen: 'applicant' | 'recruiter') => void;
  onSendMessage: (message: string, screen: 'applicant' | 'recruiter') => void;
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
  currentScreen: 'applicant' | 'recruiter';
}

export interface ToggleButtonProps {
  isChatbotVisible: boolean;
  toggleChatbot: () => void;
}
