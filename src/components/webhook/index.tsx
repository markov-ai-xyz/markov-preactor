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
        addBotMessage("What skills are you seeking a job for?");
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
