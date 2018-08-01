# 微信授权简单小结

更新时间： 2018年8月1日12:01:02

- 头像、昵称纯展示 -> [open-data 无需授权](https://developers.weixin.qq.com/miniprogram/dev/component/open-data.html)
	- 优点：无需授权即可获取数据，支持自定义样式
	- 缺点：无法获取到数据，存入后台
	- 备注：
		- 如果要调整头像的样式，可以给 `<open-data>` 父级元素设置 width、height、border-radius
		- **注意：** border-radius 需要配合 overflow:hidden 才能有圆角效果
- 申请授权获取用户信息数据 -> [button userinfo 引导用户手动点击按钮进行授权](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)
	- 优点：可以获取到用户数据，存入后台
	- 缺点：1 需要设计引导用户点击的按钮 2 需要用户授权
- openid -> [wx.login() 静默获取](https://developers.weixin.qq.com/miniprogram/dev/api/api-login.html)
	- 备注：获取 openId 、 unionId


