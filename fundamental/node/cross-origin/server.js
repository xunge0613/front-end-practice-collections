const http = require("http");
const fs = require("fs"); // 文件读取模块
const url = require("url");

let documentRoot = 'C:/git-xx/front-end-practice-collections/fundamental/node/cross-origin';
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
    console.log("ajax request received");
    let response_text = "response";
    res.writeHeader(200,{"Content-Type" : "text/plain"});
    res.end(response_text);
    console.log("string sent");
  } else {    
    fs.readFile(file, function(err,data) {
      /*
        err为文件路径
        data为回调函数
            回调函数的一参为读取错误返回的信息，返回空就没有错误
            data为读取成功返回的文本内容
      */
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

console.log('server1 started');
