---
title: Type Widening & Type Narrowing
date: "2022-10-16 21:31:53"
description: "이펙티브 타입스크립트 책을 읽고 - 타입 넓히기와 좁히기에 대해"
tags: ["typescript"]
---

> TypeScript is JavaScript with syntax for types.
>
> 타입스크립트는 타입을 위한 문법을 가지고 있는 자바스크립트이다.

타입스크립트 공식 문서에서 타입스크립트를 소개하고 있는 문장이다. 타입스크립트는 자유로운 자바스크립트에 정적 타입 체킹 시스템을 추가했기에 상수를 사용해서 변수를 초기화할 때 타입을 명시하지 않는다면 타입 체커가 타입을 결정하게 된다. 이 과정에서 타입스크립트가 타입을 유추하기 때문에 타입의 범위는 넓어지기도 하며, 넓어진 타입의 범위에서 불필요한 검사를 줄이기 위해 타입을 더 좁은 범위로 줄이기도 한다. 이 과정들을 각각 **타입 넓히기**와 **타입 좁히기** 라 한다.

사실 타입 넓히기와 타입 좁히기는 타입스크립트를 사용하면서 자연스럽게 사용하게 되는 부분인데, 이에 대해 제대로 이해하지 못하면 타입스크립트가 왜 이렇게 타입을 추론하는지 알 수 없고, 타입의 범위를 좁히기 위해 어떻게 해야하는지에 대해 막막할 수 있다고 생각해 한 번 정리하고 넘어가려고 한다.

## 타입 넓히기

```tsx
function returnString(string: "x" | "y" | "z") {
  return string
}

let x = "x"
returnString(x)
// Argument of type 'string' is not assignable to parameter of type '"x" | "y" | "z"'. (2345)
```

returnString 함수의 `'x' | 'y' | 'z'` 유니온 타입의 string을 받아 이를 리턴해주는 함수이다. x라는 변수에 “x” 값을 할당하고, returnString 함수에 변수 x를 넣어주면 `string` 타입이 `'x' | 'y' | 'z'` 타입에 할당될 수 없다는 에러가 발생한다. 변수 x가 “x”라는 값을 가지고 있지만, let으로 선언되어 있기 때문에 다른 값으로 변할 수 있어 타입스크립트는 변수 x의 타입을 string으로 추론하기 때문이다.

이처럼 타입스크립트는 타입을 정밀하게 추론하기 보다는 일반적으로 추론하게 되는데, 이 과정에서 타입의 범위가 넓어지기 때문에 `Type Widening(타입 넓히기)`라 한다.

## 타입 좁히기

`Type Widening(타입 넓히기)`가 타입스크립트가 타입을 추론하는 과정에서 발생했다면, `Type Narrowing(타입 좁히기)`는 유저가 타입의 범위를 좁히는 과정을 말한다.

만약 타입 좁히기가 없다면 불필요한 런타임 검사를 계속 해야 하고, 결과적으로 유니온 타입을 사용하기가 불편해진다. 타입을 좁히는 방법들은 다양한데, 그 중에서 자주 사용하는 방법들만 아래에 정리했다.

### 타입을 좁히는 방법들

#### 조건문 사용하기

```tsx
type Person = {
  name: string
  age?: number
}

function addAge(person: Person) {
  if (person.age) {
    person.age += 1
  }
}
```

Person 타입의 age는 optional하기 때문에 age의 타입은 `number | undefined`이다. 만약 age + 1을 실행하게 되면 age가 `undefined`일 수 있어 에러가 발생할 수 있지만, 조건문을 이용해 age가 있는지 확인한다면 age의 타입은 반드시 `number`가 되기 때문에 안전하다.

이 과정에서 `number | undefined` 타입이 `number`로 좁혀졌기에 이를 타입 좁히기라 한다.

#### `typeof` 타입 가드

```tsx
function double(item: string | number) {
  if (typeof item === "string") {
    return item.concat(item) // item이 string 타입
  } else {
    return item * 2 // item이 number 타입
  }
}
```

item의 타입은 `string | number` 이다. item의 타입이 string이면 concat을 이용해 더해주고, number이면 \* 2를 하려고 한다. 따라서 `typeof`를 이용해 item의 타입을 확인하면 string 또는 number 타입 중 하나의 타입으로 좁혀지고 에러가 발생하지 않는다

⚠️  null의 타입은 object로 나오기 때문에 `typeof` 연산자를 이용한 타입 좁히기에는 주의가 필요하다.

✏️  `instanceof` 연산자를 타입가드로 이용할 수도 있는데, 이는 class 문법을 사용할 때 주로 사용한다.

#### `in` 타입가드

```tsx
interface Student {
  grade: number
}
interface Worker {
  careerYears: number
}

type Person = Student | Worker

function sayGrade(person: Person) {
  if ("grade" in person) {
    console.log("Hello I'm in " + person.grade + "th grade.")
  }
}
```

person의 타입은 `Student | Worker` 이다. Student 타입은 grade를 가지고 있지만, Worker 타입은 가지고 있지 않다. 따라서 `in` 을 이용해 “grade”를 가지고 있는지 확인하면 person은 Student 타입으로 좁혀지고 에러가 발생하지 않는다.

#### 사용자 정의 타입 가드

```tsx
interface Student {
  grade: number
}
interface Worker {
  careerYears: number
}

type Person = Student | Worker

function isStudent(person: Person): person is Student {
  if ("grade" in person) {
    return true
  }
  return false
}

function sayHello(person: Person) {
  if (isStudent(person)) {
    console.log("Hello I'm in " + person.grade + "th grade.")
  } else {
    console.log("Hello I'm worker")
  }
}

sayHello({ grade: 10 })
// "Hello I'm in 10th grade."
```

person의 타입은 `Student | Worker` 이다. sayHello 함수에서 받는 person이 Student 타입인지, Worker 타입인지 구분하기 위해서 isStudent 함수를 만들었다. isStudent 함수를 통해 person의 타입을 하나의 타입으로 좁혀서 사용할 수 있게 된다.

# Ref.

- [이펙티브 타입스크립트](https://product.kyobobook.co.kr/detail/S000001033114)
- [JavaScript With Syntax For Types.](https://www.typescriptlang.org/)
- [Type Narrowing](https://medium.com/nodejs-server/type-narrowing-ts-f62fc28f413f)
