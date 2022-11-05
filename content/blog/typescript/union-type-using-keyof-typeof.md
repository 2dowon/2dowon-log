---
title: object의 key로 union type 만들기
date: "2022-11-05 23:31:53"
description: "keyof, typeof를 이용해 object의 key로 union type 만들기"
tags: ["typescript"]
---

## 문제 상황

```tsx
const COLOR_CODES = {
  화이트: "#FFFFFF",
  블랙: "#000000",
	...
}
```

위처럼 COLOR_CODES 값을 object로 저장해서 쓰고 있는 상황이다. 나중에 “화이트”처럼 색상 값을 받아서 이에 맞는 color code를 가져오기 위함이다. (ex. `COLOR_CODES[”화이트”]`)

즉, color 값을 받아서 COLOR_CODES[color] 값을 가져오고 싶은데 이 때 color의 타입을 string으로 지정했더니 타입스크립트에서는 string이 화이트, 블랙과 같은 값이 될 수 없다는 에러가 발생했다. 당연하다. COLOR_CODES object 안에 만약 화이트, 블랙만 있는데 내가 블루 색상을 가져오려고 하면 없는 key이기 때문에 에러가 발생할 수 밖에 없기 때문이다.

## 해결

위 상황을 해결해주기 위해서는 color의 타입이 string이 아닌 COLOR_CODES object의 key 중 하나라는 것을 보장해줘야 한다. 즉, COLOR_CODES object의 key만을 이용해서 유니온 타입을 만들어야 한다.

처음에는 아래처럼 그냥 유니온 타입을 정의하면 되지 않나? 라고 생각을 잠깐 했다.

```jsx
type colorUnionType = "화이트" | "블랙" ...
```

근데 그렇게 되면 일단 색상이 너무 많을 경우에는 당연히 타입을 정의하는 것부터 힘들고, 더 큰 문제는 COLOR_CODES object가 변경될 때마다 타입으로 정의한 값도 계속 수정이 필요하다는 것이다. 위 방법은 너무 비효율적이기에 object에서 key값만 이용해서 이를 바로 유니온 타입으로 만드는 방법도 있을텐데 생각했는데, 당연히 있었다 ㅎㅎ

바로 아래처럼 `keyof typeof` 를 이용하면 된다. 아래에서 좀 더 살펴보자.

```tsx
export const COLOR_CODES = {
  화이트: "#FFFFFF",
  블랙: "#000000",
	...
} as const;

export type TCOLOR_OF_COLOR_CODES = keyof typeof COLOR_CODES;
```

### 1. as const를 이용해서 Readonly로 값 고정하기

```tsx
const COLOR_CODES = {
  화이트: "#FFFFFF",
  블랙: "#000000",
	...
} as const;
```

> COLOR_CODES는 아래처럼 정의된다

```tsx
const COLOR_CHIPS: {
    readonly 화이트: "#FFFFFF";
    readonly 블랙: "#000000";
		...
}
```

### 2. `typeof`를 이용해서 object를 타입으로 만들기

`typeof`는 값을 type으로 쓰고 싶을 때 사용한다. JS 값은 type으로 쓸 수 없기 때문에 `typeof`를 사용해 type으로 만들어주는 것이다. 다시 말하자면 타입(type, interface 등)은 타입 공간에 존재하고, 그 외에는 값 공간에 존재하는데, `typeof`를 적용해 값 공간의 값을 타입 공간에서 타입으로 이용할 수 있도록 만드는 것이다.

그렇기 때문에 값 공간에서의 `typeof` 와 타입 공간에서의 `typeof`는 다르게 동작한다.

```jsx
interface ICOLOR_CODES {
	[colorName: string]: string;
}

const COLOR_CODES: ICOLOR_CODES = {
  화이트: "#FFFFFF",
  블랙: "#000000",
	...
}

// typeof는 타입으로 쓰일 때와 값으로 쓰일 때가 다른 기능을 한다
type TypeOfType = typeof COLOR_CODES; // ICOLOR_CODES
const typeOfValue = typeof COLOR_CODES; // object
```

여기서는 타입 공간에서 typeof를 사용하여 object를 type으로 만들 수 있다. 아래처럼 `COLOR_CODES` 에 `typeof` 를 이용해서 `colorType` 타입을 만드는 것이다.

```tsx
const COLOR_CODES = {
  화이트: "#FFFFFF",
  블랙: "#000000",
	...
} as const;

type TCOLOR_TYPE = typeof COLOR_CODES;
```

> colorType은 아래처럼 정의된다

```tsx
type TCOLOR_TYPE = {
    화이트: string;
    블랙: string;
		...
}
```

### 3. `keyof`를 이용해서 object의 key를 가지고 유니온 타입 만들기

마지막으로 `keyof` 키워드를 이용함으로써 object 타입의 key로 올 수 있는 타입에 제한을 줄 수 있다.

```tsx
type TCOLOR_TYPE = typeof COLOR_CODES
type TCOLOR_OF_COLOR_CODES = keyof colorType
```

> `TCOLOR_OF_COLOR_CODES`은 아래처럼 정의된다

```tsx
type TCOLOR_OF_COLOR_CODES = "화이트" | "블랙" ...
```

# Ref.

- [Documentation - Keyof Type Operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)
- [typescript keyof typeof](https://lovemewithoutall.github.io/it/typescript-keyof-typeof/)
