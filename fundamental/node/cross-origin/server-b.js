// 后端接口响应服务器
const http = require("http");
const fs = require("fs"); // 文件读取模块
const url = require("url");
const file_path = require('path');


// let documentRoot = 'C:/git-xx/front-end-practice-collections/fundamental/node/cross-origin';
let documentRoot = file_path.dirname(__filename);
// 文件目录地址

let server = http.createServer(function(req,res) { 
  // 客户端输入的 url
  // eg： localhost:8080/index.html，那么此处 url /index.html
  let path = url.parse(req.url).pathname; // 解析访问的路径
  let file = documentRoot + req.url;
  
  //console.log(req);
  switch (path) {
   
    case  "/ajax":
      // 跨域失败，未进行处理
      console.log(req)
      console.log("ajax request received",req.url);
      let response_text = `请求成功,请求地址：${req.url}`;
      res.writeHeader(200,{"Content-Type" : "text/plain"});
      res.end(response_text);
      console.log("response sent");
      break;
    case  "/cross-origin":
      // 跨域失败 域名限制
      console.log("ajax request received",path);
      res.writeHeader(200, {
        'content-type' : 'text/html; charset=UTF-8',
        "Access-Control-Allow-Origin" :"http://localhost:8081",              
        "Access-Control-Allow-Methods" : "PUT,POST,GET,DELETE,OPTIONS",
      });
      res.write(path + ' 跨域成功');
      res.end();
      break;
    case  "/nocross":
      // 成功跨域
      console.log("ajax request received",path);
      res.writeHeader(200, {
        'content-type' : 'text/html; charset=UTF-8',
        "Access-Control-Allow-Origin" :"*",    
      });
      res.write(path + ' 跨域成功');
      res.end();
      break;
    case  "/cross-options":
      // 非简单请求      
       console.log("ajax request received",path);
       res.writeHeader(200, {
         'content-type' : 'text/html; charset=UTF-8',
         "Access-Control-Allow-Origin" :"*",        
         "Access-Control-Allow-Headers": "TEST,TEST1,content-type",
         "Access-Control-Allow-Methods" : "PUT,POST,GET,DELETE,OPTIONS",         
       });
       res.write(path + ' 跨域成功');
       res.end();
      break;
    case  "/cross-cookie":
      // 带 cookie 的请求
       console.log("ajax request received",path);
       res.writeHeader(200, {
         'content-type' : 'text/html; charset=UTF-8',
         "Access-Control-Allow-Origin" :"http://localhost:8080",  //    http://localhost:8080
         'Access-Control-Allow-Credentials': true,
         //"Access-Control-Allow-Headers": "with-credentials",
       });
       res.write(path + ' 跨域成功');
       res.end();
      break;
    default:
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
      break;
  }   
}).listen(8081);

console.log('server b started');
