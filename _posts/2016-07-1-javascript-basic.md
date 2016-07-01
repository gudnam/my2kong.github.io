---
layout: post
title: javascript 기본
tags: javascript
---

## 선언순서

* CSS는 body전에 선언하고, javascript는 body 이후에 로딩하도록 하자.

## Event

```javascript
var el = document.getElementById("outside");
el.addEventListener("click", function(){

}, false);
```

[Event Types] (https://developer.mozilla.org/en-US/docs/Web/Events)