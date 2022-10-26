class bulletScreen {
	livesocket
	url
	timeout = 60000 //60s
	timeoutObj
	isForceClose = false
	
	constructor(url) {
		var support = "MozWebSocket" in window ? "MozWebSocket" : ('WebSocket' in window ? 'WebSocket' : null);
		if (support == null) {
			alert("您的浏览器不支持WebSocket!");
			return false;
		}
		console.log("即将与" + url + "建立websocket链接");
		this.url = url;
	}
	initWebSocket(callbackObj) {
		this.livesocket = new WebSocket(this.url);
		this.livesocket.onopen = function(evnt) {
			console.log("开启websocket连接");
			// console.log(evnt);
			callbackObj.opencallback(evnt);
		};
		this.livesocket.onmessage = function(evnt) {
			console.log("服务器推送数据");
			// console.log(evnt);
			if (JSON.parse(evnt.data).type != "ping") callbackObj.messagecallback(JSON.parse(evnt.data));
		};
		this.livesocket.onerror = function(evnt) {
			console.log("异常");
			// console.log(evnt);
			callbackObj.errorcallback();
		};
		this.livesocket.onclose = function(evnt) {
			console.log("关闭websocket连接");
		}
	}
	doSend(url) {
		console.log("即将发送一条websocket" + url);
		this.livesocket.send(url);
	}
	doClose() {
		console.log("手动断开链接，停止心跳检测");
		this.isForceClose = true;
		this.livesocket.close();
	}
	isClosed() {
		if(!this.livesocket || this.livesocket.readyState == 2 || this.livesocket.readyState == 3) {
			return true;
		} else {
			return false;
		}
	}
	destroy() {
		if(this.livesocket) {
		    this.livesocket = null;
		}
	}

}



var heartCheck2 = {
	timeout: 10000, //10s
	serverTimeOut: 30000,
	timeoutObj: null,
	status: true,
	serverTimeoutObj: null,
	sock: null,
	reset: function() {
		if (this.status) {
			clearTimeout(this.timeoutObj);
			clearTimeout(this.serverTimeoutObj);
			this.start();
		}

	},
	start: function(sock) {
		var self = this;
		if (heartCheck.status) {
			this.timeoutObj = setTimeout(function() {
				heartCheck.sock.send(JSON.stringify({
					"type": "ping",
				}));
				console.log("dosend" + JSON.stringify({
					"type": "ping",
				}));
				alert(JSON.stringify({
					"type": "ping",
				}));
				//self.serverTimeoutObj = setTimeout(function() {
				// 	debugger;
				// 	console.log("即将关闭");
				// 	heartCheck.sock.close(); //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
				// }, self.serverTimeOut);
			}, this.timeout);
		}
	},
}



export default bulletScreen;
