// 前端页面访问服务器
const http = require("http");
const fs = require("fs"); // 文件读取模块
const url = require("url");
const file_path = require('path');
const qs = require("querystring");

let documentRoot = file_path.dirname(__filename);

//'C:/git-xx/front-end-practice-collections/fundamental/node/cross-origin';
// 文件目录地址

let server1 = http.createServer(function(req,res) {
  let _url = req.url;
  // 客户端输入的 url
  // eg： localhost:8080/index.html，那么此处 url /index.html

  let file = documentRoot + _url;
  let path = url.parse(req.url).pathname; // 解析访问的路径
  //console.log(req);
  console.log(path,_url);
  if(path == "/ajax") {
    // 当前域名下的 ajax 请求，未跨域
    console.log("ajax request received");
    let response_text = "response";
    res.writeHeader(200,{"Content-Type" : "text/plain"});
    res.end(response_text);
    console.log("string sent");
  } else if(path == '/proxy') {
    // 后端调用其他域名接口，不跨域
    let data = {
      value: 'hello xx',  
      time: new Date().getTime()
    };
    let content = qs.stringify(data);
    let options = {
      hostname: 'localhost',
      port: 8081,
      path: '/ajax?' + content,
      method: 'GET'
    }  
  
    let req = http.request(options, function (res2) {  
      console.log('STATUS: ' + res2.statusCode);  
      console.log('HEADERS: ' + JSON.stringify(res2.headers));  
      res2.setEncoding('utf8');  
      res2.on('data', function (chunk) {  
        console.log('收到参数: ' + chunk);  
        let response_text = chunk;
        res.writeHeader(200,{"Content-Type" : "text/plain"});
        res.end(response_text);
      });  
    });  
      
    req.on('error', function (e) {  
      console.log('problem with request: ' + e.message);  
    });  
      
    req.end();  
  

  }else {    
    fs.readFile(file, function(err,data) {
      /*
        err为文件路径
        data为回调函数
            回调函数的一参为读取错误返回的信息，返回空就没有错误
            data为读取成功返回的文本内容
      */
     console.log(file)
    if(err) {
      res.writeHeader(404, {
        'content-type' : 'text/html; charset=UTF-8'      
      });
      res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
      res.end();
    } else {
      res.writeHeader(200,{
        'content-type' : 'text/html;charset="utf-8"'
      });
      res.write(data); //将index.html显示在客户端
      res.end(); 
    }
    });
  } 
}).listen(8080);

console.log('server1 localhost:8080 started');
