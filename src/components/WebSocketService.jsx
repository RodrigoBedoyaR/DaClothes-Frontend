import Stomp from 'stompjs';
import SockJS from 'sockjs-client/dist/sockjs';

class WebSocketService {
  static instance = null;
  stompClient = null;

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  connect() {
    return new Promise((resolve, reject) => {
      const socket = new SockJS('http://localhost:8080/ws');
      this.stompClient = Stomp.over(socket);

      this.stompClient.connect({}, (frame) => {
        resolve(this.stompClient);
      }, (error) => {
        console.error('WebSocket connection error:', error);
        reject(error);
      });
    });
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }
}

export default WebSocketService;
