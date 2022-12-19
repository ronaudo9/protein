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
type Users = {
  id:number,
  firstName: string,
  lastName: string,
  firstNameKana: string,
  lastNameKana: string,
  middleName: string,
  email: string,
  password: string,
  passwordConfirmation: string,
  postCode: string,
  prefecture: string,
  city: string,
  aza: string,
  building: string,
  tel: string,
  deleted: boolean,
}

type Users2={
  firstName:string,
    lastName: string,
    firstNameKana: string,
    lastNameKana: string,
    postCode: string,
    prefecture: string,
    city: string,
    aza: string,
    building: string,
    email: string,
    middleName: string,
    tel: string,
    password: string,
    passwordConfirmation: string,
}

type User3 = React.Dispatch<React.SetStateAction<{
  firstName: string;
  lastName: string;
  firstNameKana: string;
  lastNameKana: string;
  postCode: string;
  prefecture: string;
  city: string;
  aza: string;
  building: string;
  email: string;
  middleName: string;
  tel: string;
  password: string;
  passwordConfirmation: string;
}>>;

type Item = {
  items: any;
  preventDefault(): unknown;
  date: string;
  value: any;
  map(arg0: (cart: Item) => JSX.Element): import("react").ReactNode;
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
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onkeypress: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onClickDiv: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  handler: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  handleChange:(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export type { User };
export type { Users };
export type { Users2 };
export type {User3};
export type { Item };
export type { Event };
