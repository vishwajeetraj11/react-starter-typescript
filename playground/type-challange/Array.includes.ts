/*
Example 2 - Arrays
https://www.youtube.com/watch?v=F7O4gA0GXqI&t=388s
Implement the JavaScript `Array.includes` function in the type system.
A type takes the two argument.
The output should be a boolean true or false.

For example


```ts
type isPillarMan = Includes<['Mars','Esidisi','Wamuu','Satana'],'Dio'> // expected to be false.
```
*/

import { Equal, Expect, NotEqual } from '@type-challenges/utils';

type MyEqual<K extends unknown, U extends unknown> = (<T>() => T extends K
  ? 1
  : 2) extends <T>() => T extends U ? 1 : 2
  ? true
  : false;

type Includes<T extends readonly any[], U> = T extends [infer F, ...infer R]
  ? Equal<U, F> extends true
    ? true
    : Includes<R, U>
  : false;

// type Includes<
//   TArray extends readonly any[],
//   TItem
// > = TItem extends TArray[number] ? true : false;

type Ex = ['Cars', 'Example', 'Number'];

type see = Ex[number];

type see2 = Includes<['Cars', 'Example', 'Number'], 'Number'>;

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
  Expect<
    Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>
  >,
  Expect<
    Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>
  >,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>
];
