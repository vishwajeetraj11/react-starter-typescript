// https://www.youtube.com/watch?v=hBk4nV7q6-w&t=1032s
export const getDeepValue = <
  TObj,
  TFirstKey extends keyof TObj,
  TSecondKey extends keyof TObj[TFirstKey]
>(
  obj: TObj,
  firstKey: TFirstKey,
  secondKey: TSecondKey
) => {
  return obj[firstKey][secondKey];
};

const obj = {
  foo: {
    a: true,
    b: 2,
  },
  bar: {
    c: '12',
    d: 18,
  },
};

const value = getDeepValue(obj, 'foo', 'a');

const returnWhatIPass = <TVal>(value: TVal) => {
  return value;
};

const result = returnWhatIPass(22);
const result1 = returnWhatIPass({ aNew: 'd', f: 3 });
const result2 = returnWhatIPass([]);
const result3 = returnWhatIPass('string');
