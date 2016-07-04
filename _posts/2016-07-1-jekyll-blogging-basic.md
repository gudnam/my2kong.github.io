---
layout: post
title: Jekyll을 사용하여 블로그 만들기
tags: Jekyll
---

Jekyll은 마크다운(MD) 형식의 텍스트 파일을 제너레이트하여 정적인 블로그를 만들수 있게 해준다.
비교적 간단한 방법으로 블로그 환경을 구축할 수 있으며, GitHub pages를 이용하여 무료 호스팅도 가능하다.


## 설치

Jekyll은 Ruby 스크립트로 구성되어 있으므로 클라이언트에 Ruby가 설치되어 있어야 한다.
아래 명령어로 Ruby가 설치되어 있는지 확인하자.

```bash
ruby --version
```

OS X는 기본적으로 Ruby가 설치되어 있지만 windows는 별도의 클라이언트 프로그램을 설치해 주어야 한다.
[Ruby 공식사이트](https://www.ruby-lang.org/ko/downloads/)에 방문하여 클라이언트 프로그램을 설치한다.
Ruby를 설치했다면 gem 명령어를 사용할 수 있게 된다.  

gem 명령어로 jekyll을 설치하자.

```bash
sudo gem jekyll
```


## Event

```javascript
var el = document.getElementById("outside");
el.addEventListener("click", function(){

}, false);
```

[Event Types] (https://developer.mozilla.org/en-US/docs/Web/Events)