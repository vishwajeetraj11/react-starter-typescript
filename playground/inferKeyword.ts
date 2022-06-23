/*
https://www.youtube.com/watch?v=3Fxoxg_FMpg
infer keyword
infer allows us to go inside a type and pull out another type so that we can use that inside type in own type that we are creating.

4 Examples
*/

/*
----------------------------------------------------------------------------
Example 1 - Using infer to capture the value of any Generic Arguments
*/

import { Equal, Expect, NotEqual } from '@type-challenges/utils';

type QueueJob<Q extends string, P> = {
  queue: Q;
  payload: P;
};

type WelcomeEmail = {
  to: string;
  body: string;
};

type ProcessPayment = {
  username: string;
  accountId: number;
};

type WelcomeEmailJob = QueueJob<'email', WelcomeEmail>;
type ProcessPaymentJob = QueueJob<'batch', ProcessPayment>;

/*
Create a type that will go inside of our jobs and pull out the name of the queue.

type QueueName<Job extends QueueJob<string, unknown>> = Job extends QueueJob<infer Name, unknown> ? Name : never;

we are using infer in this place to capture whatever type is the 1st generic argument to the Queue Job. 
*/

type QueueName<J extends QueueJob<string, unknown>> = J extends QueueJob<
  infer N,
  unknown
>
  ? N
  : never;

// type EmailQueue = "email" -> onhover
type EmailQueue = QueueName<WelcomeEmailJob>;
type PaymentQueue = QueueName<ProcessPaymentJob>;

/*
--------------------------------------------------------------------------
Example 2 - Arrays

Implement the JavaScript `Array.includes` function in the type system.
A type takes the two argument.
The output should be a boolean true or false.

For example

```ts
type isPillarMan = Includes<['Mars','Esidisi','Wamuu','Satana'],'Dio'> // expected to be false.
```
*/

type Includes<T extends readonly any[], U> = T extends [infer F, ...infer R]
  ? Equal<U, F> extends true
    ? true
    : Includes<R, U>
  : false;

/**
 * infer F - infer First value in the array
 * ...infer R - Rest of the values in the arrays
 *
 * Now that 1st type we can compare F to U and see if they are the same type.
 * using Equal Utility type from @type-challange utility provides.
 *
 * inner conditional
 * Equal<U, F> extends true ? true : Includes<R, U>
 * which does the recursion
 */

type cases = [
  Expect<Equal<Includes<['Mars', 'Esidisi', 'Wamuu', 'Satana'], 'Dio'>, false>>,
  Expect<Equal<Includes<['A', 'B', 'C', 'D'], 'D'>, true>>,
  Expect<Equal<Includes<['Dad', 'Mon', 'Clark', 'Lea'], 'Sefl'>, false>>,
  Expect<Equal<Includes<['G', 'G', 'G', 'C'], 'G'>, true>>
];

/*
---------------------------------------------------------------------------
Example - 3 - functions 

3312 - Parameters
-------
by midorizemi (@midorizemi) #easy #infer #touple #built-in

### Question 

Implement the built-in Parameters<T> generic without using it.

*/

/*--------- Your Code Here ----------*/
type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer A
) => any
  ? A
  : never;

/*---------- Test Cases ------------ */

const foo = (arg1: string, agr2: number): void => {};
const bar = (arg1: boolean, arg2: { a: 'A' }): void => {};
const baz = (): void => {};

type fnCases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
  Expect<NotEqual<MyParameters<typeof bar>, [boolean, { a: 'AB' }]>>
];

/*
-----------------------------------------------------------------
Example 4

Get Return Type
-----
by Anthony Fu (@antfu) #medium #infer #built-in

### Question

Implement the build-in `ReturnType<T>` generic without using it.

For example

```ts
const fn = (v: boolean) => {
  if(v) {
    return 1
  } else {
    return 2
  }
}

type a = MyReturnType<typeof fn> // should be "1 | 2"
```
*/

/* -------- Your Code Here ------------ */

type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

/* -------- Test Cases --------------- */

type returnCases = [
  Expect<Equal<string, MyReturnType<() => string>>>,
  Expect<Equal<123, MyReturnType<() => 123>>>,
  Expect<Equal<Promise<boolean>, MyReturnType<() => Promise<boolean>>>>
];

/*
--------------------------------------------------------------------------
Example 5 - Template Literals

108 - Trim
----------------
by Anthony Fu (@antfu) medium #template-literal

### Question

Implement `Trim<T>` which takes an exact string type and return a new string with the white space from both ends removed.

Ex- 

```ts
type trimed = Trim<`  Hello    `> // expected to be 'Hello'
```
 */

/* -------- Your Code Here ------------ */

type Characters = ' ' | '\n' | '\t';

type Trim<S extends string> = S extends `${Characters}${infer SS}`
  ? Trim<SS>
  : S extends `${infer SS}${Characters}`
  ? Trim<SS>
  : S;

/* -------- Test Cases --------------- */

type strCases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str   '>, 'str'>>,
  Expect<Equal<Trim<'str.    '>, 'str.'>>,
  Expect<Equal<Trim<'str.   '>, 'str.'>>,
  Expect<Equal<Trim<'str.   '>, 'str.'>>,
  Expect<Equal<Trim<'\n\t  str.   \t'>, 'str.'>>
];

/*
------------------------------------------------------------
Example 6

  189 - Awaited
  -------
  by Maciej Sikora (@maciejsikora) #easy #promise #built-in
  
  ### Question
  
  If we have a type which is wrapped type like Promise. How we can get a type which is inside the wrapped type? For example if we have `Promise<ExampleType>` how to get ExampleType?
  
  > This question is ported from the [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4) by [@maciejsikora](https://github.com/maciejsikora)
  
  > View on GitHub: https://tsch.js.org/189

*/

/* _____________ Your Code Here _____________ */

type MyAwaited<P extends Promise<unknown>> = P extends Promise<infer R>
  ? R extends Promise<unknown>
    ? MyAwaited<R>
    : R
  : never;

/* _____________ Test Cases _____________ */

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<Promise<Promise<string | boolean>>>;

type promiseCases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>
];

// @ts-expect-error
type error = MyAwaited<number>;
