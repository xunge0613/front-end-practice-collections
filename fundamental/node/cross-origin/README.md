# ajax 跨域研究（CORS 实现）

## demo 步骤

- 运行 node server.js (前端应用服务器)
- 运行 node server-b.js（后端服务器，CORS）
- 运行 node server-jsonp（后端服务器，jsonp）
- 运行 node server-websocket（后端服务器，websocket）
- 浏览器中访问 http://localhost:8080 即可验证

## demo 注意事项

- 具体解决方案和说明注释里都有写，如果没写，contact 我

## 速记

- jsonp
- CORS
    - Access-Control-Allow-Origin
        - 基本跨域
    - Access-Control-Allow-Methods
        - 非简单请求（PUT/DELETE/OPTIONS）
    - Access-Control-Allow-Headers
        - 非简单请求（1 自定义 header 2 自定义 content-type ）
    - Access-Control-Allow-Credentials
        - CORS 带 cookie
- websocket
    - 无跨域问题
- 反向代理
    - 未完待续

## contact

xxdalston@gmail.com
wechat: X_XDalston
