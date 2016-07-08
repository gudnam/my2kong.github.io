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
[Ruby 공식사이트](https://www.ruby-lang.org/ko/downloads/)에 방문하여 RubyInstaller 클라이언트 프로그램을 설치한다.
Ruby를 설치했다면 gem 명령어를 사용할 수 있게 된다.  

gem 명령어로 jekyll을 전역유틸리티로 설치한다.  
전역유틸리티로 설치시 관리자 권한이 필요할 수 있으므로 sudo 명령어를 함께 써주도록 하자.

```bash
sudo gem jekyll
```

전역유틸리티에 설치가 완료되었다면 jekyll new 명령어를 이용하여 로컬 프로젝트 디렉토리에 jekyll을 설치하자.

```bash
jekyll new my-jekyll-blog
```

설치된 로컬 프로젝트로 접근하여

```bash
cd my-jekyll-blog
```

jekyll serve 명령어를 입력하면 프로젝트가 Generating되면서 서버를 띄울수 있게 된다.  
콘솔에 노출되는 http://127.0.0.1:4000 또는 localhost:4000을 브라우저에 입력하면 jekyll 사이트를 볼 수 있다.

```bash
jekyll serve

Generating... 
 done in 0.416 seconds.
 Auto-regeneration: enabled for '/my-jekyll-blog'
Configuration file: /my-jekyll-blog/_config.yml
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
```

![jekyll 사이트 띄우기](/public/img/jekyll-blogging-basic_1.jpg)

jekyll serve 명령어 뒤에 -w 옵션을 붙여주면 소스파일이 수정될때마다 자동으로 빌드해 주므로 편리하다.

```bash
jekyll serve -w
```


## Github Pages

생성한 jekyll 프로젝트를 Github Repository에 등록하면 [Github Pages](https://pages.github.com/)를 이용하여 호스팅 할 수 있다.  
Github Page는 Github의 프로젝트를 만들 수 있게 Github에서 제공하고 있는 서비스로, 블로그를 운영하기 위해 별도의 웹서버 환경을 구축하지 않고 단지 Repository에 push하는 것만으로 서버 호스팅이 가능하다.  
  
Github는 Github Account Page 즉 계정페이지를 지원하는데 생성된 계정이 사이트의 url이 된다.  
예를 들면 Github에 **mykong**이라는 계정을 생성하였다면 사이트의 주소는 **mykong**.github.io 가 되는 것이다.
계정 페이지를 만들기 위해 Github에 새로운 Repository를 생성한다.

### Repository 생성

Github 계정으로 로그인후 New Repository를 클릭하여 Repository생성 페이지로 이동한다.

![Github Repository 생성하기](/public/img/jekyll-blogging-basic_2.jpg)


계정페이지는 반드시 **Github의 계정**.github.io 라는 규칙으로 만들어야 한다. 한개의 계정당 하나의 Github Account Page를 가질수 있는 듯 하다.  
저장소는 Public으로 설정하고 Create repository 버튼을 클릭하여 생성을 완료한다.

![Github Repository 생성하기](/public/img/jekyll-blogging-basic_3.jpg)

생성한 jekyll 프로젝트와 Repository 주소를 remote로 연결해 주어야 한다.  
프로젝트에 git remote add 명령어를 입력하여 저장소와 연결하자.

```bash
git init
git remote add origin https://github.com/Github 계정/Github 계정.github.io.git
```

git add 명령어로 index에 추가하고, commit 후 저장소에 프로젝트 파일을 push하자.

```bash
git add *
git commit -m "블로그 초기 파일 commit"
git push origin master
```

저장소에 파일이 제대로 push 되었는지 확인한다. 

![Github Repository 파일 확인](/public/img/jekyll-blogging-basic_4.jpg)


이제 브라우저에 **Github 계정**.github.io 을 입력하면 사이트를 확인할 수 있다.

![Github 계정 주소로 사이트 확인](/public/img/jekyll-blogging-basic_5.jpg)
