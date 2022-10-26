import _config from "../assets/js/config";
import store from "@/store";
let recLock = false;
let recNum = 0;
function socket({ Vue, uid }) {
  createSocket({ Vue, uid });
}
function listenSocket({ Vue, uid }) {
  Vue.prototype.$socket.addEventListener("open", () => {
    console.log(
      "%cSocket Open",
      "color:cyan;font-size:16px;background-color:#333;"
    );
    // heartCheck.reset().start()
  });
  Vue.prototype.$socket.addEventListener("message", (res) => {
    let newMsg = JSON.parse(res.data);
    let msgSessions = store.getters.msgSessions;
    let repeatIndex = null;
    //是否数组所有元素uid都与新消息uid不相等
    let everyDif = msgSessions.every((item, index) => {
      if (item.uid == newMsg.uid) {
        repeatIndex = index;
      }
      return item.uid != newMsg.uid;
    });
    //如果新消息uid与数组元素uid不重复,直接把消息push进msgSession
    if (everyDif) {
      newMsg.msgState = true;
      msgSessions.push(newMsg);
      //如果新消息uid与数组元素uid重复,则替换掉重复元素
    } else {
      msgSessions[repeatIndex] = newMsg;
      msgSessions[repeatIndex].msgState = true;
    }

    // 改变聊天列表
    store.commit("changeMsgSessions", msgSessions);
    // heartCheck.reset().start()
  });
  Vue.prototype.$socket.addEventListener("error", (err) => {
    console.log("%cSocket Error", "color:red;background-color:#333;");
    Vue.prototype.$socket.close();
  });

  Vue.prototype.$socket.addEventListener("close", (reason) => {
    console.log("%cSocket Close", "color: #ccc;background-color:#333;");
    recSocket({ Vue, uid });
  });
}
function createSocket({ uid, Vue }) {
  try {
    if ("WebSocket" in window) {
      Vue.prototype.$socket = new WebSocket(
        `${_config.socketServerAddress}?${uid}`
      );
      listenSocket({ Vue, uid });
    } else if ("MozWebSocket" in window) {
      Vue.prototype.$socket = new MozWebSocket(
        `${_config.socketServerAddress}?${uid}`
      );
      listenSocket({ Vue, uid });
    } else {
      alert("您的浏览器不支持websocket");
    }
  } catch (e) {
    recSocket({ uid, Vue });
  }
}
function recSocket({ uid, Vue }) {
  if (recLock) return;
  recLock = true;
  //六秒内只允许重连一次
  setTimeout(() => {
    recNum++;
    //允许累计重连10次
    recLock = false;
    if (recNum <= 10) {
      createSocket({ Vue, uid });
      //尝试重连达到11次则等待5分钟再重连
    } else if (recNum == 11) {
      recSocket({ uid, Vue });
      setTimeout(() => {
        recNum = 0;
      }, 1000 * 60 * 5); //1000 * 60 * 5
    } else {
      //尝试重连超过超过11次则执行回调检测是否过了等待时间
      recSocket({ uid, Vue });
    }
  }, 6000); //6000
}
//暂未使用心跳检测
var heartCheck = {
  //六秒心跳一次，心跳时间得大于关闭连接的时间限制，否则没等关闭则进行了第二次心跳
  timeout: 6000,
  //五秒内没收到服务端消息则关闭socket连接，监听关闭，关闭后重连
  serverTimeout: 5000,
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: function() {
    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
    return this;
  },
  start: function() {
    var self = this;
    this.timeoutObj && clearTimeout(this.timeoutObj);
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
    this.timeoutObj = setTimeout(function() {
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      //onmessage拿到返回的心跳就说明连接正常
      Vue.prototype.$socket.send("HeartBeat");
      console.log("ping");
      self.serverTimeoutObj = setTimeout(function() {
        // 如果超过一定时间还没重置，说明后端主动断开了
        console.log("关闭服务");
        Vue.prototype.$socket.close(); //如果onclose会执行reconnect，我们执行 websocket.close()就行了.如果直接执行 reconnect 会触发onclose导致重连两次
      }, self.serverTimeout);
    }, this.timeout);
  },
};
export default socket;
