import {Key} from './apiHeader.js'

let key = new Key();

console.log(key);

var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=2.0&ak="+key;
    document.head.appendChild(script);