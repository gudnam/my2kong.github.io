---
layout: post
title: OSX 엘캐피탄 gulp-php2html 사용시 "php-cgi" not found
tags: gulp gulp-php2html php OSX
---

프로젝트 리소스 산출물 관리를 php로 하고 있다. php 페이지는 apache환경이 셋팅되어 있지 않은 곳에서는 확인이 어려워 작업후 매번 html 파일로 변환시켜주는 작업이 필요했는데, 그 작업을 gulp 모듈의 [gulp-php2html](https://www.npmjs.com/package/gulp-php2html)을 이용하여 수행하고자 했다.

gulpfile은 아래와 같이 작성했다.

```javascript
var gulp = require("gulp");
var php2html = require("gulp-php2html");

gulp.task('default', function() {
    gulp.src("./src/*.php")
        .pipe(php2html())
        .pipe(gulp.dest("dist"));
});
```

src 폴더의 php 파일을 html 파일로 변환하여 dist 폴더로 추출하는 간단한 Task이다.
실행해보면,

```bash
gulp

Unhandled rejection Error in plugin 'gulp-php2html'
Message: "php-cgi" not found. See https://git.io/vg20U

```

php-cgi를 찾을수 없다는 오류를 내뱉는다. [모듈의 npm 공식문서](https://www.npmjs.com/package/gulp-php2html#installing-php-cgi)를 살펴보니 [homebrew](http://brew.sh/)로 php를 재설치(?)하는 가이드가 명시되어 있다.
그대로 설치해보았다.

```bash
brew tap homebrew/dupes
brew tap homebrew/versions
brew tap homebrew/homebrew-php
brew install php56
```

재설치 했지만 php-cgi는 여전히 오리무중이다. 설치된 package를 **.bashrc**나 **.zshrc** 파일의 환경변수에 등록해주어야 한단다.
아래 명령어를 입력하여 homebrew에 설치된 php를 환경변수에 등록한다.

* zsh 사용시

```bash
$ echo 'export PATH="$(brew --prefix homebrew/php/php56)/bin:$PATH"' >> ~/.zshrc
$ source ~/.zshrc
```

* bash 사용시

```bash
$ echo 'export PATH="$(brew --prefix homebrew/php/php56)/bin:$PATH"' >> ~/.bashrc
$ source ~/.bashrc
```

터미널을 껏다가 다시 켠후 버전이 잘 노출되는지 확인해본다.

```bash
PHP 5.6.24 (cgi-fcgi) (built: Jul 22 2016 02:41:29)
Copyright (c) 1997-2016 The PHP Group
Zend Engine v2.6.0, Copyright (c) 1998-2016 Zend Technologies
```

별거 아니었는데 삽질 엄청했음.
