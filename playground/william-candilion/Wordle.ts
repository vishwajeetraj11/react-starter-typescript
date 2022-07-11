// https://www.youtube.com/watch?v=JT30j4nhej4
// 1. Tokenize to Uppercase
type Tokenize<
  W extends string,
  R extends string[] = []
> = W extends `${infer First}${infer Rest}`
  ? Tokenize<Rest, [...R, Uppercase<First>]>
  : R;
// type see = Tokenize<'Apples'>;

// 2. Is the letter contained in a word?
type Contains<
  Letter extends string,
  Word extends string[],
  Index extends 0[] = []
> = Index['length'] extends Word['length']
  ? false
  : Word[Index['length']] extends Letter
  ? true
  : Contains<Letter, Word, [...Index, 0]>;

// 3. Is the letter a 🟩 🔲 🟨?
type Wordle<
  Guess extends string[],
  Word extends string[],
  Result extends string[] = []
> = Result['length'] extends Word['length']
  ? Result
  : Wordle<
      Guess,
      Word,
      [
        ...Result,
        Guess[Result['length']] extends Word[Result['length']]
          ? '🟩'
          : Contains<Guess[Result['length']], Word> extends true
          ? '🟨'
          : '🔲'
      ]
    >;
// 4. Check each letter.

type Game = Wordle<Tokenize<'Worlde'>, Tokenize<'Wordle'>>;
