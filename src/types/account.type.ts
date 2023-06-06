export type IAccount = {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string | null;
  phone: string | null;
  birth_day: string | null;
  address: string | null;
  role_id: number;
  host_id: number | null;
};

export type IFormValue = {
  name: string;
  username: string;
  password: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  rePassword: string;
};

export type IFormLoginValue = {
  username: string;
  password: string;
};
