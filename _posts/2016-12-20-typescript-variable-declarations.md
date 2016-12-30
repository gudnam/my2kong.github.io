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

## var 선언문

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

아래 예제에서 함수 **g()**는 함수 **f()** 내부에 선언된 변수 **a**를 리턴하고 있습니다. 어딘가에서 함수 **g()**가 호출된다면 변수 **a**의 값은 함수 **f()**의 값에 묶이게 됩니다.
함수 **f()**가 실행될때 함수 **g()**가 호출 되더라도 변수 **a**에 액세스 하고 수정할 수 있습니다.

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

## 스코프(Scope) 규칙

var 선언은 기존에 다른 언어들을 다루었던 사람들은 이해하기 어려운 스코프 규칙이 있습니다. 다음 예제를 보겠습니다.

```typescript
function f(shouldInitialize: boolean) {
    if (shouldInitialize) {
        var x = 10;
    }

    return x;
}

f(true);  // returns '10'
f(false); // returns 'undefined'
```

일부 독자는 위 예제에서 더블테이크(Double-take)를 수행 할 수 있습니다.
변수 **x**는 **if**블록 내부에 선언되었지만 블록 외부에서 변수 **x**에 액세스 할 수 있습니다.
그 이유는 **var**로 선언시 function, module, namespace 또는 전역 범위에서는 선언된 변수에 액세스가 가능하기 때문입니다.
이 모든 내용은 포함 된 블록에 관계없이 나중에 다룰 것입니다.

어떤 사람들은 이것을 var-scoping 또는 function-scoping이라고 부릅니다.  
매개 변수 또한 function-scoping입니다.

이러한 스코프 규칙은 몇 가지 유형의 실수를 유발할 수 있습니다.
이것을 악화시키는 한 가지 문제점은 동일한 변수를 여러 번 선언하는 것이 오류가 아니라는 사실입니다.

```typescript
function sumMatrix(matrix: number[][]) {
    var sum = 0;
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (var i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }

    return sum;
}
```

어쩌면 일부를 찾아내는 것이 쉬웠을 수도 있지만 2중 **for 루프** 내부의 변수 **i**는 우연히 상위 **for 루프**의 변수 **i**를 덮어 쓰게 되는데,
그 이유는 **i**가 동일한 함수 범위의 변수를 참조하기 때문입니다.
숙련 된 개발자가 지금까지 알고 있던 지식으로 var 선언을 사용하게 된다면, 버그로 인해 끝없는 좌절의 원천이 될 수 있습니다.

## 변수 캡처링의 단점

다음 코드의 결과가 무엇인지 추측 해보세요.

```typescript
for (var i = 0; i < 10; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
}
```

위 코드가 익숙하지 않은 사람들을 위해 설명드리자면, **setTimeout**은 특정 밀리 초 후에 함수를 실행하려고 시도할 것입니다.(멈추는 것을 기다리고 있는 것이지만)

준비되었나요? 결과를 보겠습니다.

```bash
10
10
10
10
10
10
10
10
10
10
```

많은 JavaScript 개발자는 이 동작에 친숙하겠지만, 만약 놀랐다면 여러분 혼자만은 아닐것입니다.
대부분의 사람들은 아래처럼 출력되길 기대합니다.

```bash
 0
 1
 2
 3
 4
 5
 6
 7
 8
 9
```

이전에 변수 캡처링에 대해 언급한 내용을 기억하시나요?
**setTimeout**에 전달하는 모든 함수 표현식은 실제로 동일한 범위의 동일한 **i**를 참조합니다.

그 의미를 잠깐 생각해 본다면,
**setTimeout**은 몇 밀리 초가 지나면 함수를 실행하지만, **for 루프**가 실행을 중지한 후에만 함수를 실행합니다.
따라서 **for 루프**가 실행을 중지 할 때까지 **i**의 값은 **10**이므로, **setTimeout** 함수가 호출될 때마다 **10**을 출력합니다!

이 문제의 해결방법은 반복 할때마다 **i**를 캡처하는 즉시 호출 함수 표현식 인 즉시실행함수(IIFE)를 사용하는 것입니다.

```typescript
for (var i = 0; i < 10; i++) {
    // capture the current state of 'i'
    // by invoking a function with its current value
    (function(i) {
        setTimeout(function() { console.log(i); }, 100 * i);
    })(i);
}
```

이상하게 보이는 이 패턴은 실제로 매우 일반적으로 사용됩니다.
매개 변수 목록의 **i**는 **for 루프**에 선언 된 **i**를 바라봅니다.
우리는 동일한 변수명을 사용했으므로 루프 본문을 많이 수정할 필요가 없었습니다.


## let 선언문

앞서 예제를 보며 **var**에 몇 가지 문제점이 있다는 것을 확인했습니다.
그 문제점들을 해결하고자 **let**이 도입되었습니다.
사용된 키워드 외에도 **let**문은 **var**문과 동일한 방식으로 작성됩니다.

```typescript
let hello = "Hello!";
```

중요한 차이점은 구문이 아니라 아니라 의미에 관한 것입니다. 좀더 자세히 살펴 보겠습니다.

## Block-scoping

When a variable is declared using let, it uses what some call lexical-scoping or block-scoping. Unlike variables declared with var whose scopes leak out to their containing function, block-scoped variables are not visible outside of their nearest containing block or for-loop.

let을 사용하여 변수를 선언하면 **lexical-scoping**또는 **block-scoping**이라 명칭하는 것을 사용합니다.
범위가 포함된 함수에 노출되는 **var**로 선언 된 변수와 달리, 블록 범위 변수(block-scoped variables)는 가장 가까운 포함 블록 또는 **for 루프** 외부에서 볼 수 없습니다.

```typescript
function f(input: boolean) {
    let a = 100;

    if (input) {
        // Still okay to reference 'a'
        let b = a + 1;
        return b;
    }

    // Error: 'b' doesn't exist here
    return b;
}
```

여기에는 두 개의 지역 변수 **a**와 **b**가 있습니다. **a**의 범위는 **f**의 본문으로 제한되며 **b**의 범위는 포함 if 문의 블록으로 제한됩니다.

**catch** 절에서 선언된 변수에도 유사한 범위 지정 규칙이 있습니다.

```typescript
try {
    throw "oh no!";
}
catch (e) {
    console.log("Oh well.");
}

// Error: 'e' doesn't exist here
console.log(e);
```

Another property of block-scoped variables is that they can’t be read or written to before they’re actually declared. While these variables are “present” throughout their scope, all points up until their declaration are part of their temporal dead zone. This is just a sophisticated way of saying you can’t access them before the let statement, and luckily TypeScript will let you know that.


블록 범위 변수(block-scoped variables)의 또 다른 속성은 변수가 실제로 선언되기 전에 읽거나 쓸 수 없다는 것입니다.
변수가 범위 내에서 "present" 하는 동안 선언은 모두 자신의 임시적 사각지대(TDZ: Temporary Dead Zone)의 일부가 될 때까지 모두 가리 킵니다.
이것은 **let** 서술문보다 먼저 액세스 할 수 없다는 정교한 방법이며, 다행스럽게도 TypeScript를 통해 알 수 있습니다.

```typescript
a++; // illegal to use 'a' before it's declared;
let a;
```

주의해야 할 점은 블록 범위(Block-scoped)가 선언되기 전에 변수를 캡처 할 수 있다는 것입니다.
ES2015에서 캡처가 가능한 유일한 선언 방법은 해당 함수를 호출 하는 것이며 그 외에는 런타임에서 오류를 내뱉습니다.
그러나 TypeScript는 이것을 허용하며 오류로 보고하지 않습니다.

```typescript
function foo() {
    // okay to capture 'a'
    return a;
}

// illegal call 'foo' before 'a' is declared
// runtimes should throw an error here
foo();

let a;
```

임시적 사각지대(TDZ: Temporary Dead Zone) 대한 자세한 내용은 [Mozilla 개발자 네트워크](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone_and_errors_with_let)의 관련 내용을 참조하십시오.

## 재선언 및 Shadowing

**var**를 사용해 변수를 선언할때 횟수는 중요하지 않다고 언급했습니다.

```typescript
function f(x) {
    var x;
    var x;

    if (true) {
        var x;
    }
}
```

위의 예에서 **x**의 모든 선언은 실제로 동일한 **x**를 참조하며 이는 완전히 유효합니다.
이것은 종종 버그의 원인이 되고 있습니다. 고맙게도, **let**은 이를 허용하지 않습니다.

```typescript
let x = 10;
let x = 20; // error: can't re-declare 'x' in the same scope
```

변수선언시 이러한 문제를 회피하기 위해 반드시 블록 범위(Block-scoped)를 지정할 필요는 없습니다.

```typescript
function f(x) {
    let x = 100; // error: interferes with parameter declaration
}

function g() {
    let x = 100;
    var x = 100; // error: can't have both declarations of 'x'
}
```

블록 스코프 변수가 함수 범위 변수로 절대로 선언 될 수 없다는 말은 아닙니다.
블록 범위 변수(block-scoped variables)는 명확하게 다른 블록 내에서 선언되어야 한다는 의미입니다.

```typescript
function f(condition, x) {
    if (condition) {
        let x = 100;
        return x;
    }

    return x;
}

f(false, 0); // returns '0'
f(true, 0);  // returns '100'
```

더 중첩 된 범위에 새 이름을 도입하는 것을 shadowing 이라고 합니다.
우발적인 shadowing 사고가 발생했을 때 특정 버그를 자체적으로 도입할 수 있는 양날의 칼입니다.
예를 들어 **let** 변수를 사용하여 이전에 살펴보았던 **sumMatrix** 함수를 작성했다고 가정해 보겠습니다.

```typescript
function sumMatrix(matrix: number[][]) {
    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (let i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }

    return sum;
}
```

이 루프 버전은 실제로 내부 루프의 **i**가 외부 루프의 shadows 때문에 합계를 올바르게 수행합니다.

일반적으로 Shadowing은 더 명확한 코드 작성을 위해 피해야합니다.
일부 상황에서는 Shadowing을 활용하는 것이 적절할 수 있지만 최선의 판단을 내려야합니다.

## 블록 범위 변수(block-scoped variables) 캡처링

**var**선언시 변수 캡처의 개념을 처음 접해보면서 캡처된 변수가 어떻게 작동하는지 간략하게 살펴 보았습니다.
이를 더 잘 이해하기 위해 스코프가 실행될 때마다 변수의 환경을 설정합니다.
해당 환경 및 캡처된 변수는 범위 내의 모든 항목이 완료된 후에도 존재할 수 있습니다.

```typescript
function theCityThatAlwaysSleeps() {
    let getCity;

    if (true) {
        let city = "Seattle";
        getCity = function() {
            return city;
        }
    }

    return getCity();
}
```

환경 안에서 **city**를 캡처 했으므로 **if**블록이 실행을 완료했음에도 불구하고 여전히 액세스가 가능합니다.

이전의 **setTimeout** 예제에서는 **for**루프를 반복할 때마다 변수의 상태를 캡처하기 위해 즉시실행함수(IIFE)를 사용해야한다는 결론을 얻었습니다.
사실 우리가 수행한 작업은 캡처된 변수에 대한 새로운 변수 환경을 만드는 것이었습니다.
다행스럽게도 이러한 꽤 번거로운 작업을 TypeScript에서는 할 필요가 없습니다.

**let** 선언문은 루프의 일부로 선언될때 조금 다르게 동작합니다.
루프 자체에 새로운 환경을 도입하기 보다는 이러한 선언은 반복마다 새로운 범위를 만듭니다.
어쨌든 즉시실행함수(IIFE)를 사용하여 이 작업을 수행했기 때문에 이전의 **setTimeout** 예제를 **let**을 사용하여 변경할 수 있습니다.

```typescript
for (let i = 0; i < 10 ; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
}
```

예상했던 결과값이 출력됩니다.

```bash
0
1
2
3
4
5
6
7
8
9
```

## const 선언문

**const** 선언은 변수를 선언하는 또 다른 방법입니다.

```typescript
const numLivesForCat = 9;
```

기본적으로 **let**선언과 같지만 이름에서 유추해 볼 수 있듯이 바인딩 된 후에는 그 값을 변경할 수 없습니다.
즉, **let**과 동일한 유효 범위 규칙이 있지만 한번 선언후에 다시 할당할 수는 없습니다.

이것을 그들이 참조하는 값이 불변이라는 생각과 혼동되어서는 안된다.
