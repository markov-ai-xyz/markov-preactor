import { postAudioRequestWithJwt, postRequestWithJwt } from '../utils';
import { ChatState, Message } from '../types';
import { handleWebhookConnection } from '../webhook';

class ActionProvider {
  private baseUrl: string;
  private setChatState: React.Dispatch<React.SetStateAction<ChatState>>;
  private currentScreen: 'applicant';

  constructor(baseUrl, setChatState) {
    this.baseUrl = baseUrl;
    this.setChatState = setChatState;
    this.currentScreen = 'applicant';
  }

  async parseAudio(audio, screen, chatHistory) {
    this.currentScreen = screen;
    const isNumberConfirmed = localStorage.getItem('isNumberConfirmed') === 'true';
    const phoneNumber = localStorage.getItem('phoneNumber') || '';

    if (!isNumberConfirmed) {
      this.addMessage("I apologize for the confusion. Could you please provide your 10 digit phone number?", "bot");
    } else {
      await this.sendAudio(audio, screen, chatHistory, phoneNumber);
    }
  }

  async parseMessage(message, screen, chatHistory) {
    this.currentScreen = screen;
    const isNumberConfirmed = localStorage.getItem('isNumberConfirmed') === 'true';
    const phoneNumber = localStorage.getItem('phoneNumber') || '';

    if (!isNumberConfirmed) {
      await this.handleFirstInteraction(message);
    } else {
      await this.sendMessage(message, screen, chatHistory, phoneNumber);
    }
  }

  async handleFirstInteraction(message) {
    const phoneNumberPattern = /^\d{10}$/;
    if (phoneNumberPattern.test(message)) {
      const formattedNumber = this.prependCountryCode(message);
      await this.handlePhoneNumber(formattedNumber);
    } else {
      this.addMessage("I apologize for the confusion. Could you please provide your 10 digit phone number?", "bot");
    }
  }

  prependCountryCode(number) {
    return `91${number}`;
  }

  async handlePhoneNumber(input) {
    await handleWebhookConnection(this.baseUrl, input, this.addMessage.bind(this));
  }

  async sendAudio(audioBlob, screen, chatHistory, phoneNumber) {
    const endpoint = `${this.baseUrl}/erekrut-agent-audio`;
    const formData = new FormData();

    console.log(audioBlob);
    formData.append('audio', audioBlob);
    formData.append('phone_number', phoneNumber);
    formData.append('chat_history', JSON.stringify(chatHistory));

    try {
      const response = await postAudioRequestWithJwt(endpoint, formData);
      const textInput = response.output;
      if (textInput.trim() !== '') {
        this.addMessage(textInput, "user");
        this.sendMessage(textInput, screen, chatHistory, phoneNumber)
      } else {
        console.log('Text input is empty. Message not sent.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      this.addMessage("Sorry, an error occurred. Please try again.", "bot");
    }
  }

  async sendMessage(message, screen, chatHistory, phoneNumber) {
    const endpoint = `${this.baseUrl}/erekrut-agent`;
    const payload = {
      phone_number: phoneNumber,
      input: message,
      chat_history: chatHistory
    };

    try {
      const response = await postRequestWithJwt(endpoint, payload);
      this.addMessage(response.output, "bot");
    } catch (error) {
      console.error('Error sending message:', error);
      this.addMessage("Sorry, an error occurred. Please try again.", "bot");
    }
  }

  addMessage(message: string, type: 'bot' | 'user') {
    this.setChatState(prevState => ({
      ...prevState,
      [this.currentScreen]: [...prevState[this.currentScreen], { message, type }],
    }));
  }
}

export default ActionProvider;
