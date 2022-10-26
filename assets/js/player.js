import _config from "../assets/js/config";

var scriptDom = document.createElement("script");

scriptDom.charset = "utf-8";

scriptDom.src = _config.webH5playerSdk;

document.body.appendChild(scriptDom);



