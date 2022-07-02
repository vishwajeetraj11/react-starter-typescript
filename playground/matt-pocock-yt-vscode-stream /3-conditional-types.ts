// https://www.youtube.com/watch?v=hBk4nV7q6-w&t=1032s

type Animal = {
  name: string;
};

type Human = {
  firstName: string;
  lastName: string;
};

type GetRequiredInformation<TType> = TType extends Animal
  ? { age: number }
  : TType extends Human
  ? { socialSecurityNumber: string }
  : never;

export type RequiredInformationForAnimal = GetRequiredInformation<Animal>;

export type RequiredInformationForHuman = GetRequiredInformation<Human>;

export type RequiredInformationForAlien = GetRequiredInformation<{
  planet: string;
}>;
