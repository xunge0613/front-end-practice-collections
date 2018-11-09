# Front End Practice Collections 

@(Front End Questions and Solutions)[前端开发, JavaScript, github]

[TOC]

Front End practice collections, including **Questions,  Answers, Demo and Solutions** , etc.

English | 简体中文

----------

## Questions Index

### iframe

#### iframe-reload 

Question:  Does location.reload inside iframe invoke parent page reload?

Answer:  No. 

Demo: 

`tag: iframe, reload`


## Solutions Index

### iframe 

#### iframe-cross-domain-auto-height

Solution: Cross domain iframe auto height, control parent scrollbar

`tag: iframe, cross domain, messenger.js, iframeC.html`

------



## Methodology

### general tip

- Always make sure what you see is *not a cached or outdated version * .

### how to solve a  problem ?

First, make yourself understood

- what 
  - what is your expectation / purpose ? 
  - what is the possible reason ?
  - what is the related concept / knowledge  ? 
  - what is the difference between current workspace and last commit ?
  - what does the log info mean ? 

Else, make PC / Internet understood

- where
  - official documentation 
  - google 
  - stackoverflow / quora
  - practice-note post , eg: like this repository : ) 
  - forums
  - W3C standards / MDN
  - source code
  - can i use ... ?


Last chance, make other guys understood

- who
  - chat groups guys
  - colleague / schoolmate
  - warm-hearted friends

### how to ask a question ?

be respectful and ask in brief 

- trial 
  - tech
  - method
  - consideration
- demo
- use case 
- constraints
- expectation / purpose
- actuality

### how to note a solution ?

To be done...

## Tools



## Category 

### Tittle Category

Why ( & When & Where ): Occasion

How: Constraints, Keyword, Trial

What: Question, Answer, Demo, Solution, Tag 

### Content Category

iframe, DOM, js mobile api

## Demos

- [jQuery 移动端上拉切换屏幕](https://github.com/xunge0613/front-end-practice-collections/blob/master/widgets/jquery/detail-nav/index.html)
- [jQuery 弹窗](https://github.com/xunge0613/front-end-practice-collections/blob/master/widgets/jquery/jshop-common/popup.html)
- [jQuery 手风琴效果](https://github.com/xunge0613/front-end-practice-collections/blob/master/widgets/jquery/jshop-common/accordion.html)

## Notes

- [跨域整理](https://github.com/xunge0613/front-end-practice-collections/tree/master/fundamental/node/cross-origin)
- [微信授权的几种方法简单小结](https://github.com/xunge0613/front-end-practice-collections/blob/master/fundamental/miniapp/auth.md)

## To do list

### Questions

1 How to listen dom height change ?

Constraints: 

- Tech restrictions: no Timers ( for instant response & better user experience , for performance )
- Compatibility: IE 8+

Trial: 

- [del]DOMAttrModified[/del]
- Mutation Observer
- hack solution, listen click event on document, for most height changes results from click event

2 What is the best pratice on reusing Vue.js components lib between multi-website , eg: user-oriented 'front-end' website and  staff-oriented 'back-end' website, eg: ERP / CMS / OC / CRM ? 

假设公司有面向普通用户的前端站点以及面向内部人员的后台管理系统，都使用vue全家桶，各自有一套vue组件库，希望维护一套两者的基础组件库，然后分别面向前端与后台进行各自扩展…… 跪求相关最佳实践 

3 0.5px problem 
https://zhuanlan.zhihu.com/p/26701978

4 如何实现


## Reference



## Change Log

v 0.0.2 Reconstruct Readme.md

- new feature: Methodology

v 0.0.1 Basic Version

## License

MIT
