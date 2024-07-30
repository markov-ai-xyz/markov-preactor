export async function handleWebhookConnection(baseUrl, input, addMessage) {
  const wsUrl = `${baseUrl.replace('http', 'ws')}/authenticate`;

  return new Promise((resolve, reject) => {
    try {
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        ws.send(input);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        addMessage(data.message, "bot");
        if (data.status === "Confirm") {
          localStorage.setItem('isNumberConfirmed', 'true');
          localStorage.setItem('phoneNumber', input);
          addMessage("Please share your whereabouts using the pin icon below", "bot");
        }
      };

      ws.onclose = () => {};

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
