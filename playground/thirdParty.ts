type UserAddress = {
  street: string;
  city: string;
  country: string;
};

type UserId = number;

export interface User {
  id: UserId;
  name: string;
  address: UserAddress;
}
