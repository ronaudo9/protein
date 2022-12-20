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
  items: any;
  preventDefault(): unknown;
  date: string;
  value: any;
  map(arg0: (cart: Item) => JSX.Element): import('react').ReactNode;
  length: number;
  forEach(arg0: (element: Item) => void): unknown;
  key: string;
  id: number;
  userId: number;
  itemId: number;
  name: string;
  imageUrl: string;
  category: string;
  flavor: string[];
  price: number;
  description: string;
  content: string;
  countity: number;
};

type Event = {
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onkeypress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClickDiv: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
};

type Favorite = {
  itemsArray4: string[];
  favs: string[];
  item: string;
  favoriteItem: any;
  id: number;
  userId: number;
  itmId: number[];
  imageUrl: string;
  name: string;
  price: number;
};

export type { User };
export type { Item };
export type { Event };
export type { Favorite };
