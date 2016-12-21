---
layout: post
title: TypeScript 변수 선언
tags: typescript
---

> Angular2 프로젝트를 위해 TypeScript를 공부하던중 관련 자료가 많지 않아 공식문서에 내용들을 조금씩 번역(의역)하고 있습니다.
개인 공부용이 목적이지만 저처럼 필요하신 분들에게 도움이 되면 좋겠네요. 
구글 번역기와 머리속에 들어있는 아주 극소량의 영어지식으로 작성중이니 잘못된 부분이나 더 좋은 번역, 의견 있으시면 댓글에 많이 적어주세요. 

# 변수 선언

**let**과 **const**는 새로운 유형의 변수 선언입니다.
이전에 언급했듯이, **let**은 **var**와 유사하지만 자바스크립트에서 일반적으로 발생하는 "gotchas"를 피할 수 있습니다.
**const**는 선언된 변수에 값을 재할당 할 수 없다는 점에서 **let**과 다릅니다.

TypeScript는 자바스크립트의 슈퍼 셋(상위 개념)이므로 **let**과 **const**를 지원합니다.
이번장에서는 위 두가지 새로운 선언 방법들에 대해 더 자세히 알아보고, 왜 **var**를 사용하는 것보다 더 바람직한지를 자세히 설명하겠습니다.
자바스크립트를 그냥 사용하거나 **var**로 선언 했을때의 모든 단점을 잘 알고 있다면 다음장으로 건너뛰어도 좋습니다.

## var 선언

전통적으로 자바스크립트에서 변수 선언은 var 키워드로 수행되었습니다.

```typescript
var a = 10;
```

코드를 보면 알 수 있듯이, 값이 10 인 변수 a를 선언했습니다.  
물론 함수 안에서의 선언도 가능합니다.

```typescript
function f() {
    var message = "Hello, world!";

    return message;
}
```
함수 안의 다른 함수 내에서 동일한 변수에 액세스 할 수도 있습니다.

```typescript
function f() {
    var a = 10;
    return function g() {
        var b = a + 1;
        return b;
    }
}

var g = f();
g(); // returns '11'
```

아래 예제에서 **g()** 함수는 함수 **f()**에 선언 된 변수 **a**를 캡처했습니다. 어떤 점에서 g가 호출되면, a의 값은 f의 값에 묶일 것이다. f가 한 번 실행되면 g가 호출 되더라도 a에 액세스하고 수정할 수 있습니다.

```typescript
function f() {
    var a = 1;

    a = 2;
    var b = g();
    a = 3;

    return b;

    function g() {
        return a;
    }
}

f(); // returns '2'
```
