export default class SocketService {
  /**
   * 单例
   */
  static instance = null
  static get Instance() {
    if (!this.instance) {
      this.instance = new SocketService()
    }
    return this.instance
  }
  // 和服务端连接的socket对象
  ws = null
  // 定义连接服务器的方法
  connect() {
    // 连接服务器
    if (!window.WebSocket) {
      return console.log('您的浏览器不支持 WebSocket');
    }
    this.ws = new SocketService('ws://localhost:9998')
    // 连接成功的事件
    this.ws.onopen = () => {
      console.log('连接服务器成功了...');
    }
    // 连接服务端失败
    this.ws.onclose = () => {
      console.log('连接服务端失败了...');
    }
    // 得到服务端发送过来的数据
    this.ws.onmessage = msg => {
      console.log('从服务端获取到的数据...');
      // 真正的数据在 msg.data 中
      console.log(msg.data);
    }
  }
}