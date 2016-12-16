---
layout: post
title: TypeScript 기본 자료형
tags: typescript
---

> Angular2 프로젝트를 위해 TypeScript를 공부하던중 관련 자료가 많지 않아 공식문서에 내용들을 조금씩 번역(의역)하고 있습니다.
개인 공부용이 목적이지만 저처럼 필요하신 분들에게 도움이 되면 좋겠네요. 
구글 번역기와 머리속에 들어있는 아주 극소량의 영어지식으로 번역중이니 잘못된 부분이나 더 좋은 번역, 의견 있으시면 댓글에 많이 적어주세요. 

# 소개

프로그램을 보다 효율적으로 작성하기 위해서는 숫자(Number), 문자열(String), 구조(Structures), 불린(Boolean) 등 가장 기본적인 데이터 단위를 사용할 수 있어야합니다.
TypeScript는 자바스크립트에서 사용할 수 있는 유형을 편리한 열거형으로 지원합니다.

## Boolean

가장 기본적인 데이터 유형으로 true / false 값을 호출하는 **boolean**이 있습니다.

```typescript
let isDone: boolean = false;
```

## Number

자바스크립트에서와 동일하게 TypeScript의 모든 숫자는 정수와 부동 소수점이며, 이를 **Number** 타입으로 선언합니다.
TypeScript는 16진수 및 10진수 외에도 ECMAScript 2015에 도입 된 바이너리 및 8 진수를 지원합니다.

```typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

## String

웹페이지와 서버를 위한 프로그램을 자바스크립트로 제작할때 기본이 되는 문자 데이터입니다.
다른 언어에서와 마찬가지로, TypeScript는 이러한 문자 데이터 유형을 나타 내기 위해 **String** 타입을 사용합니다.
TypeScript는 문자열 데이터임을 명시하기 위해 자바스크립트와 동일한 큰 따옴표 (**"**) 또는 작은 따옴표 (**'**)를 사용합니다.

```typescript
let color: string = "blue";
color = 'red';
```

템플릿 문자열을 사용하면 문자열을 여러 행으로 나누어 작성할 수 있고, 표현식을 넣을수 있습니다. 
템플릿 문자열은 backtick/backquote (**`**) 문자로 둘러싸여 있으며, 내부에 **${ expr }** 와 같은 표현식이 가능합니다.

```typescript
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }.

I'll be ${ age + 1 } years old next month.`
```

이것은 다음과 같이 문장을 선언하는 것과 같습니다.

```typescript
let sentence: string = "Hello, my name is " + fullName + ".\n\n" +
    "I'll be " + (age + 1) + " years old next month."
```
