export default class WebSocketUtil {
  private socket: WebSocket;

  constructor(private lastUrl:string) {
    console.log(lastUrl);
    const url = "wss://www.nextstepcode.club/websocket" + lastUrl
    // const url = "ws://127.0.0.1:8080/websocket" + lastUrl
    // 创建WebSocket实例
    this.socket = new WebSocket(url);
    
    // 监听连接建立事件
    this.socket.onopen = () => {
      console.log("WebSocket连接已建立");
    };
    
    // 监听接收消息事件
    this.socket.onmessage = (event) => {
      this.onMessageReceived(event.data);
    };   
    
    // 监听连接关闭事件
    this.socket.onclose = () => {
      console.log("WebSocket连接已关闭");
    };
    
    // 监听错误事件
    this.socket.onerror = (error) => {
      console.error("WebSocket错误:", error);
    };
  }

  send(message: string) {
    // 发送消息
    this.socket.send(message);
  }



  close() {
    // 关闭WebSocket连接
    this.socket.close();
  }

  onMessageReceived(message: string) {
    // 处理接收到的消息
    console.log("收到消息:", message);

    // ...
  }
}

// 使用示例
// const socket = new WebSocketUtil();
// socket.send("Hello WebSocket!");

// 在适当的时机关闭连接
// socket.close();