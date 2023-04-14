

// 导出socket对象
// https://www.jianshu.com/p/f9aa24ee91dd
export {
  socket
}

// socket主要对象
var socket = {
  websock: null,
  // 固定的WebSocket地址：此处是从env文件中读取socket地址，可以自行从其他config文件中读取或直接写死
  // 如需使用动态WebSocket地址，请自行作ajax通讯后扩展
  ws_url: "",
  // 43.139.235.208
  base_url:'ws://localhost:8081/ws',
  // 开启标识
  socket_open: false,
  // 心跳timer
  hearbeat_timer: null,
  // 心跳发送频率
  hearbeat_interval: 5000,

  // 是否自动重连
  is_reonnect: true,
  // 重连次数
  reconnect_count: 3,
  // 已发起重连次数
  reconnect_current: 1,
  // 重连timer
  reconnect_timer: null,
  // 重连频率
  reconnect_interval: 3000,

  /**
   * 初始化连接
   */
  init: () => {
    if (!("WebSocket" in window)) {
      return null
    }

    // 已经创建过连接不再重复创建
    if (socket.websock) {
      return socket.websock
    }

    socket.websock = new WebSocket(socket.ws_url)
    socket.websock.onmessage = function (e) {
      socket.receive(e)
    }

    // 关闭连接
    socket.websock.onclose = function (e) {
      console.log('连接已断开')
      console.log('connection closed (' + e.code + ')')
      clearInterval(socket.hearbeat_interval)
      socket.socket_open = false

      // 需要重新连接
      if (socket.is_reonnect) {
        socket.reconnect_timer = setTimeout(() => {
          // 超过重连次数
          if (socket.reconnect_current > socket.reconnect_count) {
            clearTimeout(socket.reconnect_timer)
            return
          }

          // 记录重连次数
          socket.reconnect_current++
          socket.reconnect()
        }, socket.reconnect_interval)
      }
    }

    // 连接成功
    socket.websock.onopen = function (e) {
      console.log('连接成功')
      socket.socket_open = true
      socket.is_reonnect = true
      // 开启心跳
      //socket.heartbeat()
    }

    // 连接发生错误
    socket.websock.onerror = function () {
      console.log('WebSocket连接发生错误')
    }
  },

  /**
   * 发送消息
   * @param {*} data 发送数据
   * @param {*} callback 发送后的自定义回调函数
   */
  send: (data, callback = null) => {
    // 开启状态直接发送
    if (socket.websock.readyState === socket.websock.OPEN) {
      socket.websock.send(JSON.stringify(data))

      if (callback) {
        callback()
      }

      // 正在开启状态，则等待1s后重新调用
    } else if (socket.websock.readyState === socket.websock.CONNECTING) {
      setTimeout(function () {
        socket.send(data, callback)
      }, 1000)

      // 未开启，则等待1s后重新调用
    } else {
      socket.init()
      setTimeout(function () {
        socket.send(data, callback)
      }, 1000)
    }
  },

  /**
   * 接收消息
   * @param {*} message 接收到的消息
   */
  receive: (message) => {
    var params = JSON.parse(message.data)

    if (params.kind != 0) {
      console.log('收到服务器内容：', message.data)
    }

    if (params == undefined) {
      console.log("收到服务器空内容")
      return false
    }
    

  },

  /**
   * 心跳
   */
  heartbeat: () => {
    console.log('socket', 'ping')
    if (socket.hearbeat_timer) {
      clearInterval(socket.hearbeat_timer)
    }

    socket.hearbeat_timer = setInterval(() => {
      const token = storage.get('Access-Token')
      var data = {
        kind: 0, //请求类型 kind 0 心跳包
        shop_id: Vue.prototype.$shop_id(false), //如果是商家 传当前店铺ID 否则可不传
        'API-Token': token, //用户的token
        'API-Source': 'MERCHANT', // MERCHANT  商家  CUSTOMER  顾客
      }
      socket.send(data)
    }, socket.hearbeat_interval)
  },

  /**
   * 主动关闭连接
   */
  close: () => {
    console.log('主动断开连接')
    clearInterval(socket.hearbeat_interval)
    socket.is_reonnect = false
    socket.websock.close()
  },

  /**
   * 重新连接
   */
  reconnect: () => {
    console.log('发起重新连接', socket.reconnect_current)

    if (socket.websock && socket.socket_open) {
      socket.websock.close()
    }

    socket.init()
  },
}