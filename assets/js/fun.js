//import {_config} from './config.js'

import 
  config
 from "./config.js"

export default {
	handlerDatas(arr, value){
		console.log(arr,'arr');
		console.log(value,'value');
        let obj = {};
        arr.forEach((item, index) => {
          let { value } = item;
          if (!obj[value]) {
            obj[value] = {
              value,
              children:[]
            }
          }
          obj[value].children.push(item);
        });
        return Object.values(obj); // 最终输出
      },

	setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	},
	getBase64Image(img) {
		var canvas = document.createElement("canvas");
		canvas.width = img.width;
		canvas.height = img.height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, img.width, img.height);
		var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
		var dataURL = canvas.toDataURL("image/" + ext);
		return dataURL;
	},
	getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i].trim();
			if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return "";
	},
	getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	},
	// 转为unicode 编码
	encodeUnicode(str) {
		var res = [];
		for (var i = 0; i < str.length; i++) {
			res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
		}
		return "\\u" + res.join("\\u");
	},
	// 解码
	decodeUnicode(str) {
		str = str.replace(/\\/g, "%");
		//转换中文
		str = unescape(str);
		//将其他受影响的转换回原来
		str = str.replace(/%/g, "\\");
		//对网址的链接进行处理
		str = str.replace(/\\/g, "");
		return str;
	},
	listBubbleSort(arr) {
		for (var j = 0; j < arr.length - 1; j++) {
			//两两比较，如果前一个比后一个大，则交换位置。
			for (var i = 0; i < arr.length - 1 - j; i++) {
				if (arr[i] > arr[i + 1]) {
					var temp = arr[i];
					arr[i] = arr[i + 1];
					arr[i + 1] = temp;
				}
			}
		}
	},
	/*
	  节流函数
	  fn:需要节流的函数
	  wait:节流的时间
	*/
	throttle(fn, wait) {
		var timer = null;
		return function() {
			var context = this;
			var args = arguments;
			if (!timer) {
				timer = setTimeout(function() {
					fn.apply(context, args);
					timer = null;
				}, wait)
			}
		}
	},
	getTimeforTimestamp(date, fmt) { //获取时间
		date = parseInt(date);
		var date = new Date(date);
		if (!fmt) {
			fmt = "yyyy-MM-dd hh:mm:ss"
		}

		//author: meizz   
		var o = {
			"M+": date.getMonth() + 1, //月份   
			"d+": date.getDate(), //日   
			"h+": date.getHours(), //小时   
			"m+": date.getMinutes(), //分   
			"s+": date.getSeconds(), //秒   
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度   
			"S": date.getMilliseconds() //毫秒   
		};
		if (/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;

	},
	getTrim(str) { //删除左右两端的空格
		return str.replace(/(^\s*)|(\s*$)/g, "");
	},
	//将秒转化为时分秒
	formateSeconds(endTime) {
		let secondTime = parseInt(endTime) //将传入的秒的值转化为Number
		let min = 0 // 初始化分
		let h = 0 // 初始化小时
		let result = ''
		if (secondTime > 60) { //如果秒数大于60，将秒数转换成整数
			min = parseInt(secondTime / 60) //获取分钟，除以60取整数，得到整数分钟
			secondTime = parseInt(secondTime % 60) //获取秒数，秒数取佘，得到整数秒数
			if (min > 60) { //如果分钟大于60，将分钟转换成小时
				h = parseInt(min / 60) //获取小时，获取分钟除以60，得到整数小时
				min = parseInt(min % 60) //获取小时后取佘的分，获取分钟除以60取佘的分
			}
		}


		if (min == 0 && h == 0) {
			result = `${secondTime.toString().padStart(1,'0')}秒`
		} else if (h == 0) {
			result = `${min.toString().padStart(1,'0')}分${secondTime.toString().padStart(1,'0')}秒`
		} else {
			result = `${h.toString().padStart(1,'0')}时${min.toString().padStart(1,'0')}分${secondTime.toString().padStart(1,'0')}秒`
		}


		return result
	},
	getImageUrl(filePath) {
		// console.log(filePath);
		// console.log(arguments)
	  let uploadsUrl = config.fileServerAddress;
	  if (!filePath) {
	    return uploadsUrl
	  } else if (filePath.indexOf('http') == 0) {
	    return filePath
	  } else {
	    var nPos = filePath.indexOf('upload')
	    if (nPos == 0 || nPos == 1) {
	      var nPos2 = filePath.indexOf('/', nPos)
	      if (nPos2 > 0) {
	        filePath = filePath.substring(nPos2 + 1)
	      }
	    }
	    if (
	      uploadsUrl.lastIndexOf('/') == uploadsUrl.length - 1 ||
	      filePath.indexOf('/') == 0
	    ) {
	      return uploadsUrl + filePath
	    } else {
	      return uploadsUrl + '/' + filePath
	    }
	  }
	}
}
