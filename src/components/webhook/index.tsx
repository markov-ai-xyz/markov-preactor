import { postRequestWithJwt } from '../utils';

export async function handleWebhookConnection(baseUrl, input, addBotMessage) {
  const wsUrl = `${baseUrl.replace('http', 'ws')}/authenticate`;

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
        addBotMessage(data.message);
      };

      ws.onclose = async () => {
        const latitude = localStorage.getItem('latitude');
        const longitude = localStorage.getItem('longitude');
        const payload = {
          phone: input,
          lat: latitude,
          long: longitude,
        };

        try {
          await postRequestWithJwt(`${baseUrl}/location`, payload);
          addBotMessage("What skills are you seeking a job for?");
          return;
        } catch (error) {
          console.error('Error:', error);
          addBotMessage("An error occurred while processing your location.");
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
