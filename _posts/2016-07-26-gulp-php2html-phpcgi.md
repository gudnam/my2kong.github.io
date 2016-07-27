---
layout: post
title: gulp-php2html 사용시 "php-cgi" not found
tags: gulp gulp-php2html php
---

프로젝트 리소스 산출물 관리를 php로 하고 있다. php 페이지는 apache환경이 셋팅되어 있지 않은 곳에서는 확인이 어려워, 작업후 매번 html 파일로 변환시켜주는 작업을 수행했었는데 gulp 모듈중 [gulp-php2html](https://www.npmjs.com/package/gulp-php2html) 모듈을 이용하고 있다.  
  
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
돌려보자.

```bash
gulp

Unhandled rejection Error in plugin 'gulp-php2html'
Message: "php-cgi" not found. See https://git.io/vg20U

```