const API_BASE_URL = 'http://0.0.0.0:8000';
const WS_BASE_URL = 'ws://0.0.0.0:8000';

export async function processFile(file: File, onLog: (log: string) => void) {
  const formData = new FormData();
  formData.append('file', file);

  // Connect to WebSocket
  const ws = new WebSocket(`${WS_BASE_URL}/ws`);
  ws.onmessage = (event) => {
    onLog(event.data);
  };

  try {
    const response = await fetch(`${API_BASE_URL}/process`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    // Close WebSocket connection
    ws.close();

    return result;
  } catch (error) {
    console.error('Error processing file:', error);
    // Close WebSocket connection
    ws.close();
    throw error;
  }
}