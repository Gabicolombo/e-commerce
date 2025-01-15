export interface User {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
  cart?: any;
}
