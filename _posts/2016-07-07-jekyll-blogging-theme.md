---
layout: post
title: Jekyll 블로그에 테마 적용하기
tags: Jekyll
---

Jekyll 최초 설치시에는 기본테마([Jekyll Now](https://github.com/barryclark/jekyll-now))가 설정되어 있으며 CSS 수정등으로 커스터마이징이 가능하다.  
기본 테마 디자인은 너무 투박해서 깔끔하고 멋드러지는 스킨으로 바꾸고 싶은데, 난 전문 디자이너가 아니기에 Jekyll 테마 사이트에서 제공하는 테마를 이용하기로 했다. 먼저 어떤 테마들을 제공하는지 아래에서 확인해보자.

<http://jekyllthemes.org/>

디자인이 아주 다양하다. 
스킨들은 대부분 오픈 소스 라이센스라서 그냥 가져다가 사용해도 될 듯 하다.  
[condinfox Lanuyon](https://github.com/codinfox/codinfox-lanyon) 딱 내 스타일이다. 이걸로 바꿔보자.


## 어떻게 적용할까

Jekyll을 도입하기 이전에 설치형 블로그([워드프레스](https://ko.wordpress.org/), [텍스트큐브](http://www.textcube.org/))를 사용했었는데, 설치형 블로그는 대부분 스킨파일만 다운받아 특정 theme 폴더에 넣고 관리자 페이지에서 지정하는 형태였다.
비슷한 구조이지 않을까 싶어 테마 파일 저장소를 뒤져봤지만 테마 적용을 위한 디렉토리는 따로 없는것 같다. 구글링을 좀 해보니 테마 저장소를 fork 떠서 clone 하란다. 아.. 테마 파일 전체를 통으로 변경해야하는 거구나. 먼저 설치했던 Jekyll을 제거하고 다시 적용해야 할 듯 하다.  
  
테마 저장소를 clone 받아 적용할 수도 있지만 이미 만들어둔 Repository가 있으므로 그냥 저장소에 파일을 다운로드받아 내 프로젝트에 넣으면 될 것 같다. 
[condinfox Lanuyon](https://github.com/codinfox/codinfox-lanyon) Github 저장소로 이동하여 **Clone or download**에 **Download ZIP** 버튼을 클릭하여 프로젝트 파일을 다운로드하자. 

![테마 프로젝트 파일 다운받기](/public/img/jekyll-blogging-theme_1.png)

압축을 풀고 파일들을 내 로컬 프로젝트로 옮긴후, 터미널에 jekyll 명령어를 입력하여 build 해준다.  

```bash
jekyll serve
```

변경된 테마로 이쁘장하게 잘 나온다. 깔끔깔끔

![테마 화면 확인](/public/img/jekyll-blogging-theme_2.png)

테마적용방법은 아주 간단한데 한번 설정해 놓으면 다른테마로 바꾸기 어려울 것 같다. 파일을 통으로 교체해야하니..  
Jekyll의 기본 디렉토리구조나 파일구조는 각 테마별로 동일한 것 같은데 내부적인 설정파일이나(__config.yml) HTML 구조가 테마별로 제각각이다.
CSS만 교체하는 것도 힘들 것 같다. 포스팅 자체는 마크다운 파일에 작성하니, 추후 블로그를 개편? 할때가 되면 마크다운 파일만 그대로 옮겨다가 새로운 테마에 적용해도 될 것 같긴하다.  
그냥 당분간 변경하지 않는 걸로..


## 내 정보로 꾸미기

블로그의 설정은 root경로에 있는 **_config.yml** 파일을 수정하면 된다. 블로그에 들어가는 기본 정보들은 이곳에 입력하게 되어 수정할 있으며, build와 관련된 디렉토리 설정도 할 수 있는 듯 하다.  
  
> 테마별로 __config.yml에 기재된 설정 정보들이 다를 수 있다. 이번 포스팅은 codinfox-lanyon 테마를 기준으로 작성되었으니 참고바란다.

설정 파일 내부에 블로그 이름이라던지 운영자 기본 신상정보? 등은 직관적이어서 보면 바로 알 수 있는 수준이니 따로 언급하지 않겠다.
자기 입맛대로 수정후 build 하면서 사이트를 보고 확인하면 된다.  
몇가지 중요한 설정들만 설명하자면,

### baseurl

baseurl 은 블로그의 root 경로를 설정해주는 부분인 듯 하다.
내가 셋팅한 블로그는 프로젝트의 경로가 최상단 root 이므로 /lanyon/은 제거했다.

```bash
# 수정전
baseurl: "/lanyon/"

# 수정후
baseurl: ""
```

### url

Github Pages에 [CNAME](https://help.github.com/articles/using-a-custom-domain-with-github-pages/) 파일을 이용하면 github.io가 아닌 개인이 소유한 커스텀 도메인으로도 연결할 수 있다.
도메인을 가지고 있다면 url에 도메인주소를 설정한다.

```bash
url: http://my2kong.net
```

### markdown

Jekyll이 사용하는 markdown 엔진을 설정한다. Jekyll은 기본적으로 kramdown 이라는 Ruby 라이브러리를 사용하며 이 라이브러리는 Github Pages에서도 사용한다고 한다. 특별한 경우외에는 수정할 일은 없을 것 같다.

```bash
markdown: kramdown
```

### google_analytics_token

구글 아널리틱스에서 제공하는 사이트 분석 도구 추적코드 입력한다. 구글 아널리틱스는 구글에서 만든 **서비스 분석기**로 웹이나 앱에서 사용자가 서비스(웹이나 앱등을)를 어떻게 실행했는지 얼마나 실행했는지를 분석해서 통계를 내주고 도식화해주는 도구이다.
추적코드는 구글에 로그인후 [아널리틱스 사이트](http://www.google.com/analytics/)에서 발급받을 수 있다.

```bash
google_analytics_token: 'UA-XXXXXXXX-X'
```

### disqus_short_name

Disqus에서 발급받은 Shortname을 입력한다. Disqus는 웹사이트에 사용할 수 있는 댓글 시스템으로 [Disqus 사이트](https://disqus.com/)에 방문하여 회원가입하면 Shortname을 발급받을 수 있다.

```bash
disqus_short_name: 'mykong'
```