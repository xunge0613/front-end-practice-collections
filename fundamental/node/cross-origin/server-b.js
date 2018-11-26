// 后端接口响应服务器

//导入querystring模块（解析post请求数据）
const querystring = require('querystring');
const http = require("http");
const fs = require("fs"); // 文件读取模块
const url = require("url");
const file_path = require('path');

let documentRoot = file_path.dirname(__filename);
// 文件目录地址

let server = http.createServer(function (req, res) {
  // 客户端输入的 url
  // eg： localhost:8080/index.html，那么此处 url /index.html
  let path = url.parse(req.url).pathname; // 解析访问的路径
  let file = documentRoot + req.url;
  //let arg = querystring.parse(url.parse(req.url).query);

  //console.log(req);
  switch (path) {
    case "/sso":
      // post + iframe 实现不刷新跨域请求
      if (req.method === 'POST') {
        /**服务端接收post请求参数的流程
         * （1）给req请求注册接收数据data事件（该方法会执行多次，需要我们手动累加二进制数据）
         *      * 如果表单数据量越多，则发送的次数越多，如果比较少，可能一次就发过来了
         *      * 所以接收表单数据的时候，需要通过监听 req 对象的 data 事件来取数据
         *      * 也就是说，每当收到一段表单提交过来的数据，req 的 data 事件就会被触发一次，同时通过回调函数可以拿到该 段 的数据
         * （2）给req请求注册完成接收数据end事件（所有数据接收完成会执行一次该方法）
         */
        //创建空字符叠加数据片段
        let data = '';

        //2.注册data事件接收数据（每当收到一段表单提交的数据，该方法会执行一次）
        req.on('data', function (chunk) {
          // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
          data += chunk;
        });

        // 3.当接收表单提交的数据完毕之后，就可以进一步处理了
        //注册end事件，所有数据接收完成会执行一次该方法
        req.on('end', function () {
          //（1）.对url进行解码（url会对中文进行编码）
          data = decodeURI(data);
          console.log(data);

          /**post请求参数不能使用url模块解析，因为他不是一个url，而是一个请求体对象 */

          //（2）.使用querystring对url进行反序列化（解析url将&和=拆分成键值对），得到一个对象
          //querystring是nodejs内置的一个专用于处理url的模块，API只有四个，详情见nodejs官方文档
          var dataObject = querystring.parse(data);
          console.log(dataObject);
          res.writeHead(302, { 'Location': 'http://localhost/sdk/index-demo.html?ssoflag=1&ssodata=1234' });
          console.log(res._header);
          res.end();
        });
      }
      break;
    case "/ajax":
      // 跨域失败，未进行处理
      console.log(req)
      console.log("ajax request received", req.url);
      let response_text = `请求成功,请求地址：${req.url}`;
      res.writeHeader(200, { "Content-Type": "text/plain" });
      res.end(response_text);
      console.log("response sent");
      break;
    case "/cross-origin":
      // 跨域失败 域名限制
      console.log("ajax request received", path);
      res.writeHeader(200, {
        'content-type': 'text/html; charset=UTF-8',
        "Access-Control-Allow-Origin": "http://localhost:8081",
        "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
      });
      res.write(path + ' 跨域成功');
      res.end();
      break;
    case "/nocross":
      // 成功跨域
      console.log("ajax request received", path);
      res.writeHeader(200, {
        'content-type': 'text/html; charset=UTF-8',
        //"Access-Control-Allow-Origin" :"*",    
      });
      res.write(path + ' 跨域成功');
      res.end();
      break;
    case "/cross-options":
      // 非简单请求      
      console.log("ajax request received", path);
      res.writeHeader(200, {
        'content-type': 'text/html; charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "TEST,TEST1,content-type",
        "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
      });
      res.write(path + ' 跨域成功');
      res.end();
      break;
    case "/cross-cookie":
      // 带 cookie 的请求
      console.log("ajax request received", path);
      res.writeHeader(200, {
        'content-type': 'text/html; charset=UTF-8',
        "Access-Control-Allow-Origin": "http://localhost:8080",  //    http://localhost:8080
        "Access-Control-Allow-Origin": "http://localhost:8081",  //    http://localhost:8080

        'Access-Control-Allow-Credentials': true,
        //"Access-Control-Allow-Headers": "with-credentials",
      });
      res.write(path + ' 跨域成功');
      res.end();
      break;
    default:
      fs.readFile(file, function (err, data) {
        /*
          err为文件路径
          data为回调函数
              回调函数的一参为读取错误返回的信息，返回空就没有错误
              data为读取成功返回的文本内容
        */
        if (err) {
          res.writeHeader(404, {
            'content-type': 'text/html; charset=UTF-8'
          });
          res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
          res.end();
        } else {
          res.writeHeader(200, {
            'content-type': 'text/html;charset="utf-8"'
          });
          res.write(data); //将index.html显示在客户端
          res.end();
        }
      });
      break;
  }
}).listen(8081);

console.log('server b started');
