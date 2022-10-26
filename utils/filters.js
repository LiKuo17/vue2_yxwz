import Vue from "vue";
Vue.filter("toHttpAddress", (val) => {
  if (val.startsWith("http") || val == "") {
    return val;
  } else {
    return `http://${val}`;
  }
});

// 将时间戳转日期格式的过滤器
Vue.filter('dateFormat', (dataStr) => {
	var time = new Date(dataStr);

	function timeAdd0(str) {
		if (str < 10) {
			str = '0' + str;
		}
		return str
	}
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
})
