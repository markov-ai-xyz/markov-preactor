import { postRequestWithJwt } from '../utils';
import { ChatState, Message } from '../types';

class ActionProvider {
  private baseUrl: string;
  private setChatState: React.Dispatch<React.SetStateAction<ChatState>>;
  private currentScreen: 'applicant' | 'recruiter';

  constructor(baseUrl: string, setChatState: React.Dispatch<React.SetStateAction<ChatState>>) {
    this.baseUrl = baseUrl;
    this.setChatState = setChatState;
  }

  async parseMessage(message: string, screen: 'applicant' | 'recruiter', chatHistory: Message[]): Promise<void> {
    this.currentScreen = screen;
    const isNumberConfirmed = localStorage.getItem('isNumberConfirmed') === 'true';
    const phoneNumber = localStorage.getItem('phoneNumber') || '';

    if (!isNumberConfirmed) {
      await this.handleFirstInteraction(message);
    } else {
      await this.sendMessage(message, screen, chatHistory, phoneNumber);
    }
  }

  private async handleFirstInteraction(message: string): Promise<void> {
    const phoneNumberPattern = /^\d{10}$/;
    if (phoneNumberPattern.test(message)) {
      const formattedNumber = this.prependCountryCode(message);
      await this.handlePhoneNumber(formattedNumber);
    } else {
      this.addBotMessage("I apologize for the confusion. Could you please provide your 10 digit phone number?");
    }
  }

  private prependCountryCode(number: string): string {
    return `91${number}`;
  }

  private async handlePhoneNumber(input: string): Promise<void> {
    const wsUrl = `${this.baseUrl.replace('http', 'ws')}/authenticate`;
    
    return new Promise((resolve, reject) => {
      try {
        const ws = new WebSocket(wsUrl);
        
        ws.onopen = () => {
          ws.send(input);
        };

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.status === "Confirm" || data.status === "Error") {
            localStorage.setItem('isNumberConfirmed', 'true');
            localStorage.setItem('phoneNumber', input);
          }
          this.addBotMessage(data.message);
        };

        ws.onclose = async () => {
          const latitude = localStorage.getItem('latitude');
          const longitude = localStorage.getItem('longitude');
          const payload = {
            "phone": input,
            "lat": latitude,
            "long": longitude,
          };
          
          try {
            await postRequestWithJwt(`${this.baseUrl}/location`, payload);
            this.addBotMessage("What skills are you seeking a job for?");
            resolve();
          } catch (error) {
            console.error('Error:', error);
            this.addBotMessage("An error occurred while processing your location.");
            reject(error);
          }
        };

        ws.onerror = (error) => {
          console.error(`WebSocket error: ${error}`);
          reject(error);
        };
      } catch (e) {
        console.error(`WebSocket error: ${e}`);
        reject(e);
      }
    });
  }

  async sendMessage(message: string, screen: 'applicant' | 'recruiter', chatHistory: Message[], phoneNumber: string): Promise<void> {
    const endpoint = `${this.baseUrl}/erekrut-agent`;
    const payload = {
      "phone_number": phoneNumber || "919650768080",
      "input": message,
      "chat_history": chatHistory
    };

    try {
      const response = await postRequestWithJwt(endpoint, payload);
      this.addBotMessage(response.output);
    } catch (error) {
      console.error('Error sending message:', error);
      this.addBotMessage("Sorry, an error occurred. Please try again.");
    }
  }

  private addBotMessage(message: string): void {
    this.setChatState(prevState => ({
      ...prevState,
      [this.currentScreen]: [...prevState[this.currentScreen], { message, type: 'bot' }],
    }));
  }
}

export default ActionProvider;
