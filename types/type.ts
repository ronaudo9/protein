type User = {
  firstName: string;
  lastName: string;
  irstNameKana: string;
  lastNameKana: string;
  middleName: string;
  email: string;
  postCode: string;
  prefecture: string;
  city: string;
  aza: string;
  building: string;
  tel: string;
  cregit: string;
  deleted: boolean;
  userId: number;
  // items: string[] | number[];
  itemId: number;
  countity: number;
  date: string;
  id: number;
};

type Item = {
  id: number;
  name: string;
  imageUrl: string;
  category: string;
  flavor: string[];
  price: number;
  description: string;
  content: string;
};

type subscriptionCart = {

}

export type { User };
export type { Item };
