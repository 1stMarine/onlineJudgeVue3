//引入使用SockJS
import SockJS from "sockjs-client";
import Stomp from "stompjs";
//请求地址
const baseUrl = "http://localhost:8080/port";
//请求头
const header = {};
//stomp客户端
let stompClient: Stomp.Client;
//连接状态
let connetStatus = false;
/**
 * 初始化连接
 */
export const initSocket = () => {
  con();
  setInterval(() => {
    //根据连接状态
    if (connetStatus) {
      try {
        //发送请求
        stompClient.send(
          "/app/hello",
          header,
          JSON.stringify({ name: "wangau" })
        );
      } catch (error) {
        con();
      }
    }
  }, 10000);
};
/**
 * 连接
 */
export const con = () => {
  let socket = new SockJS(baseUrl);

  stompClient = Stomp.over(socket);

  let header = {};
  stompClient.connect(
    header,
    () => {
      console.log("===========connect success===========");
      connetStatus = true;
      //设置订阅
      stompClient.subscribe(
        "/topic/greetings",
        (res: any) => {
          console.log(res);
        },
        header
      );
    },
    (err: any) => {
      console.log("error");
      console.log(err);
    }
  );
};

/**
 * 断开
 */
export const close = () => {
  if (stompClient) {
    stompClient.disconnect(() => {
      console.log("============connect release============");
      connetStatus = false;
    });
  }
};

