import { postAudioRequestWithJwt, postRequestWithJwt } from '../utils';
import { ChatState, Message } from '../types';
import { handleWebhookConnection } from '../webhook';

class ActionProvider {
  private baseUrl: string;
  private setChatState: React.Dispatch<React.SetStateAction<ChatState>>;
  private currentScreen: 'applicant' | 'recruiter';

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
      this.addBotMessage("I apologize for the confusion. Could you please provide your 10 digit phone number?");
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
      this.addBotMessage("I apologize for the confusion. Could you please provide your 10 digit phone number?");
    }
  }

  prependCountryCode(number) {
    return `91${number}`;
  }

  async handlePhoneNumber(input) {
    await handleWebhookConnection(this.baseUrl, input, this.addBotMessage.bind(this));
  }

  async sendAudio(audioBlob, screen, chatHistory, phoneNumber) {
    const endpoint = 'http://localhost:5000/erekrut-agent-audio';
    const formData = new FormData();

    console.log(audioBlob);
    formData.append('audio', audioBlob);
    formData.append('phone_number', phoneNumber);
    formData.append('chat_history', JSON.stringify(chatHistory));

    try {
      const response = await postAudioRequestWithJwt(endpoint, formData);
      this.addBotMessage(response.output);
    } catch (error) {
      console.error('Error sending message:', error);
      this.addBotMessage("Sorry, an error occurred. Please try again.");
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
      this.addBotMessage(response.output);
    } catch (error) {
      console.error('Error sending message:', error);
      this.addBotMessage("Sorry, an error occurred. Please try again.");
    }
  }

  addBotMessage(message) {
    this.setChatState(prevState => ({
      ...prevState,
      [this.currentScreen]: [...prevState[this.currentScreen], { message, type: 'bot' }],
    }));
  }
}

export default ActionProvider;
