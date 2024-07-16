export type Screen = 'applicant' | 'recruiter' | 'articles';

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
  onSendMessage: (message: string, screen: 'applicant' | 'recruiter') => void;
  chatState: ChatState;
}

export interface ChatContentProps {
  chatState: ChatState;
  currentScreen: Screen;
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
  currentScreen: 'applicant' | 'recruiter';
}

export interface ToggleButtonProps {
  isChatbotVisible: boolean;
  toggleChatbot: () => void;
}
