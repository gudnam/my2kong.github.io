---
layout: post
title: TypeScript 기본 자료형
tags: typescript
---

> Angular2 프로젝트를 위해 TypeScript를 공부하던중 관련 자료가 많지 않아 공식문서에 내용들을 조금씩 번역(의역)하고 있습니다.
개인 공부용이 목적이지만 저처럼 필요하신 분들에게 도움이 되면 좋겠네요. 
구글 번역기와 머리속에 들어있는 아주 극소량의 영어지식으로 작성중이니 잘못된 부분이나 더 좋은 번역, 의견 있으시면 댓글에 많이 적어주세요. 

# 소개

프로그램을 보다 효율적으로 작성하기 위해서는 숫자(Number), 문자열(String), 구조(Structures), 불린(Boolean) 등 가장 기본적인 데이터 단위를 사용할 수 있어야합니다.
TypeScript는 자바스크립트에서 사용할 수 있는 유형을 편리하게 열거형(enumeration type)으로 지원합니다.

## Boolean

가장 기본적인 데이터 유형으로 true / false 값을 호출하는 **boolean**이 있습니다.

```typescript
let isDone: boolean = false;
```

## Number

자바스크립트와 동일하게 TypeScript의 모든 숫자는 정수와 부동 소수점이며, 이를 **Number** 타입으로 선언합니다.
TypeScript는 16진수 및 10진수 외에도 ECMAScript 2015에 도입 된 바이너리 및 8 진수를 지원합니다.

```typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

## String

자바스크립트로 웹페이지와 서버를 위한 프로그램을 제작할때 기본이 되는 문자 데이터입니다.
다른 언어에서와 마찬가지로, TypeScript는 이러한 문자 데이터 유형을 나타 내기 위해 **String** 타입을 사용합니다.
TypeScript는 문자열 데이터임을 명시하기 위해 자바스크립트와 동일한 큰 따옴표 (**"**) 또는 작은 따옴표 (**'**)를 사용합니다.

```typescript
let color: string = "blue";
color = 'red';
```

템플릿 문법을 사용하면 문자열을 여러 행으로 나누어 작성할 수 있고, 표현식을 넣을수 있습니다. 
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

## Array

TypeScript는 자바스크립트와 마찬가지로 배열을 사용할 수 있습니다.
배열은 두 가지 방법 중 하나로 선언이 가능한데, 첫 번째로 타입에 **[]** 를 붙여 선언하는 방법으로 해당 요소들의 유형을 배열로 열거합니다.

```typescript
let list: number[] = [1, 2, 3];
```

두 번째 방법으로 **Array`<elemType>`** 와 같은 *generic type* 으로 선언할 수 있습니다.

```typescript
let list: Array<number> = [1, 2, 3];
```

## Tuple

튜플을 사용하면 요소 선언시 고정된 요소들의 수 만큼의 자료형을 미리 선언후 배열을 표현할 수 있습니다.
예를 들어, 문자열과 숫자의 쌍으로 값을 표시하는 예제입니다.

```typescript
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error
```

알려진 인덱스가 있는 요소에 접근 할 때 올바른 유형이 검색됩니다.

```typescript
console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
```

알려진 인덱스 집합을 벗어난 요소에 접근하기 위해서 **union** 타입을 사용할 수 있습니다.

```typescript
x[3] = "world"; // OK, 'string' can be assigned to 'string | number'

console.log(x[5].toString()); // OK, 'string' and 'number' both have 'toString'

x[6] = true; // Error, 'boolean' isn't 'string | number'
```

**union** 타입은 다음장에서 다시 설명하겠습니다.

## Enum

**enum**은 자바스크립트의 표준 데이터유형 세트에 새로 추가된 사항으로, C#과 같은 언어에서와 마찬가지로 친숙한 이름을 숫자값의 집합에 제공하는 방법입니다.

```typescript
enum Color {Red, Green, Blue};
let c: Color = Color.Green;
```

기본적으로 **enum**은 선언순으로 0부터 시작하여 요소에 순서를 부여하는데, 요소 중 하나의 순서를 수동으로 설정하여 변경할 수 있습니다. 
예를 들어 집합의 순회하는 순서가 0에서 1로 시작하도록 변경할 수 있습니다.

```typescript
enum Color {Red = 1, Green, Blue};
let c: Color = Color.Green;
```

또는 **enum**의 모든 값을 수동으로 설정할 수 있습니다.

```typescript
enum Color {Red = 1, Green = 2, Blue = 4};
let c: Color = Color.Green;
```

**enum**의 편리한 기능으로 수치 값을 **enum** 형의 값의 이름으로 이동할 수 있습니다. 
예를 들어 값이 2이지만 위의 **enum**형의 Color 변수에 매핑 된 것이 확실하지 않은 경우 해당 이름을 찾을 수 있습니다.

```typescript
enum Color {Red = 1, Green, Blue};
let colorName: string = Color[2];

alert(colorName);
```

## Any

응용 프로그램을 작성할 때 타입이 명확하지 않은 변수 유형을 선언해야 할 수도 있습니다.
이때 **any** 타입으로 선언시 동적 콘텐츠(예: 사용자 또는 제 3자의 라이브러리)에서 값에 대한 유형 검사를 선택하지 않고, 컴파일 타임 검사를 통과하도록 합니다.

```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```

**any** 타입은 선언시 기존 자바스크립트와 동일하게 동작할 수 있는 강력한 방법이므로 컴파일하는 동안 점차적으로 옵트 인(opt-in) 및 옵트 아웃(opt-out) 할 수 있습니다.
다른 언어에서처럼 Object와 비슷한 역할을 할 것으로 예상할 수 있겠지만, Object 타입의 변수는 값을 할당할 수만 있습니다.
실제 존재하는 메소드라도 임의의 메소드를 호출 할 수는 없습니다.

```typescript
let notSure: any = 4;
notSure.ifItExists(); // 성공, 런타임에 ifItExists가 존재할 수 있습니다
notSure.toFixed(); // 성공, toFixed가 존재 (컴파일러가 검사하지 않음)

let prettySure: Object = 4;
prettySure.toFixed(); // 에러: 'toFixed'속성이 'Object'유형에 존재하지 않습니다
```

모든 타입의 일부분을 알고 있다면 편리하겠지만, 그렇지 않을수도 있습니다.
예를 들어 배열이지만 다른 유형이 혼재되어 있는 경우가 그렇습니다.

```typescript
let list: any[] = [1, true, "free"];

list[1] = 100;
```

## Void

**void**는 어떤 타입도 전혀 가지지 않는 것으로 **any**형의 반대라고도 볼 수 있습니다. 일반적으로 값을 반환하지 않는 함수의 반환 유형으로 사용할 수 있습니다.

```typescript
function warnUser(): void {
    alert("This is my warning message");
}
```

void 타입의 변수 선언은 undefined 또는 null 만 할당 할 수 있으므로 유용하지 않습니다.

```typescript
let unusable: void = undefined;
```

## Null and Undefined

TypeScript에서 **undefined**와 **null**은 실제로 각각 **undefined**와 **null**이라는 자체 유형을 가지지만, **void**와 비슷하므로 유용하지 않습니다.

```typescript
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
```

기본적으로 **null** 및 **undefined**는 다른 모든 유형의 하위 유형이므로 **null**과 **undefined**를 **number**와 같은 것으로 지정할 수 있습니다.

그러나 **--strictNullChecks** 플래그를 사용하는 경우라면 **null** 및 **undefined**는 **void** 및 해당 유형에만 할당 하는것이 많은 일반적인 오류를 피할 수 있는 방법입니다. 
**string** 또는 **null** 또는 **undefined**을 전달하려는 경우, **string | null | undefined** 에 **unido** 형식을 사용할 수 있습니다. 
다시 한번, union 타입에 대한 자세한 내용은 다음장에서 설명합니다.

> 가능하다면 --strictNullChecks를 사용하는 것이 좋지만 본 핸드북의 목적상 해제되어 있다고 가정합니다.

## Never

**never**형은 결코 발생하지 않는 값의 유형을 나타냅니다. 예를 들어, **never**는 함수 표현식의 반환 유형에 따라 
항상 예외를 throw 하는 화살표 함수 표현식 또는 반환하지 않는 표현식이 될 수 있습니다.
변수는 true가 아닌 유형의 가드에 의해 범위가 좁혀지면 **never** 유형을 획득합니다.

**never** 타입은 모든 타입의 하위영역으로 속할수 있으나 어떠한 타입도 **never**타입의 하위영역이 될 수 없습니다.
심지어 **any**도 **never**타입에 배정될 수 없습니다.

**never**를 반환하는 함수의 몇 가지 예를 보겠습니다.

```typescript
// 반환하는 함수에는 도달 할 수 없는 종점이 있어야합니다.
function error(message: string): never {
    throw new Error(message);
}

// never 형이 반환됩니다.
function fail() {
    return error("Something failed");
}

// 반환하는 함수에는 도달 할 수 없는 종점이 있어야합니다.
function infiniteLoop(): never {
    while (true) {
    }
}
```

## Type assertions

TypeScript를 사용하다보면 때로는 어떤 값에 대해 더 많은 가치를 알아야 할 상황에 처할 수 있습니다.
일반적으로 Type assertions은 어떤 entity의 유형을 현재 유형보다 더 구체적으로 표현할때 사용됩니다.

이것은 컴파일러에게 "나를 믿어라, 나는 내가 하는 일을 알고 있다." 라고 말하는 방법으로,
다른 언어의 타입 캐스팅과 비슷하지만 특별한 검사나 데이터 재구성을 수행하지 않으며, 런타임에 영향을 미치지 않도록 컴파일러에서만 사용됩니다.
TypeScript는 이를 프로그래머가 필요한 특별한 검사를 수행했다고 가정합니다.

Type assertions에는 두 가지 형식이 있습니다. 하나는 **`< >`**구문입니다.

```typescript
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```

그리고 다른 하나는 **as** 구문입니다.

```typescript
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```

두 예제는 동일하며, 각자 선호도에 맞게 사용하면 됩니다.
그러나 TypeScript를 JSX와 함께 사용할 때는 **as** style assertions만 허용됩니다.

## let 선언에 대하여

지금까지 예제에서 우리가 알고 있는 자바스크립트의 **var** 키워드 대신 **let** 키워드를 사용했음을 알 수 있습니다.
**let** 키워드는 실제로 TypeScript에서 사용할 수 있는 더 새로운 JavaScript 구문입니다.
나중에 자세한 내용을 설명 하겠지만 let의 사용으로 자바 스크립트의 많은 일반적인 문제가 완화되므로 가능할 때마다 **var** 대신 사용하는 것이 좋습니다.
