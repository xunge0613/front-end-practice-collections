# ajax 跨域研究（CORS 实现）

## demo 步骤

- 运行 node server.js
- 运行 node server-b.js
- 浏览器中访问 http://localhost:8080 即可验证

## demo 注意事项

- 具体解决方案和说明注释里都有写，如果没写，contact 我

## 速记

- Access-Control-Allow-Origin
  - 基本跨域
- Access-Control-Allow-Methods
  - 非简单请求（PUT/DELETE/OPTIONS）
- Access-Control-Allow-Headers
  - 非简单请求（1 自定义 header 2 自定义 content-type ）
- Access-Control-Allow-Credentials
  - CORS 带 cookie

## contact

xxdalston@gmail.com
wechat: X_XDalston
