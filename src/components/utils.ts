import { h } from 'preact';

type MessageType = 'bot' | 'user';

interface ChatMessage {
  message: string;
  type: MessageType;
  id: number;
}

interface BotMessageOptions {
  [key: string]: any;
  loading?: boolean;
}

interface Config {
  apiKey?: string;
  initialMessages?: ChatMessage[];
  widgets?: any[];
}

export const uniqueIdGenerator = (): (() => number) => {
  let num = 1;
  return () => num++;
};

const uniqueId = uniqueIdGenerator();

export const botMessage = (message: { type: string }): boolean => {
  return message.type === 'bot';
};

export const createChatMessage = (message: string, type: MessageType): ChatMessage => {
  return {
    message,
    type,
    id: uniqueId(),
  };
};

export const createChatBotMessage = (message: string, options: BotMessageOptions = {}): ChatMessage & BotMessageOptions => {
  return {
    ...createChatMessage(message, 'bot'),
    ...options,
    loading: true,
  };
};

export const createClientMessage = (message: string): ChatMessage => {
  return createChatMessage(message, 'user');
};

export const validateApiKey = async (apiKey?: string): Promise<void> => {
  if (!apiKey || typeof apiKey !== 'string') {
    console.error('API key is missing or is not a string.');
  }

  try {
    const response = await fetch('https://www.markovai.xyz/validate-api-key', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      },
    });

    if (!response.ok) {
      console.error(response.json);
    }

    const data = await response.json();
    localStorage.setItem('markovJwt', data.token);
  } catch (e) {
    console.error(e);
  }
};

export const postRequestWithJwt = async (url: string, payload: any): Promise<any> => {
  const token = localStorage.getItem('markovJwt');
  if (!token) {
    throw new Error('No token found in local storage');
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};
