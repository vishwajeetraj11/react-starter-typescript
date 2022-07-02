export const deepEqualCompare = <Arg>(
  a: Arg extends any[] ? "Don't pass an array" : Arg,
  b: Arg extends any[] ? "Don't pass an array" : Arg
): boolean => {
  // This check is moved at type level.
  // if (Array.isArray(a) || Array.isArray(b)) {
  //   throw new Error(
  //     "You cannot compare two arrays using deepEqualCompare"
  //   );
  // }
  return a === b;
};

const value = deepEqualCompare({ a: 'a' }, { a: 'a' });

// Argument of type 'never[]' is not assignable to parameter of type '"Don't pass an array"'.
// const z = deepEqualCompare([],[])
