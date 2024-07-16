import { postRequestWithJwt } from '../utils';
import { ChatState, Message } from '../types';

class ActionProvider {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async sendMessage(message: string, screen: 'applicant' | 'recruiter', chatHistory: Message[])
  : Promise<string> {
    const endpoint = `${this.baseUrl}/erekrut-agent`;
    const payload = {
      "phone_number": "919650768080",
      "input": message, 
      "chat_history": chatHistory
    };

    try {
      const response = await postRequestWithJwt(endpoint, payload);
      return response.output;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async performAction(actionType: string, payload: any): Promise<any> {
    const endpoint = `${this.baseUrl}/${actionType}`;

    try {
      const response = await postRequestWithJwt(endpoint, payload);
      return response;
    } catch (error) {
      console.error(`Error performing action ${actionType}:`, error);
      throw error;
    }
  }
}

export default ActionProvider;
