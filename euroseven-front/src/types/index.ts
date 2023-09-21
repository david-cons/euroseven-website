export type UserEntity = {
  id: number;
  username: string; //email
  password: string;
  inactive?: boolean;
  saldo?: number;
  role?: string;
  name?: string;
  codClient?: number;
  address?: string;
  localitate?: string;
  phone?: string;
  image?: string;
};

export type InvoiceEntity = {
  id: number;
  created_date?: Date;
  due_date?: Date;
  price?: number;
  file?: string;
  paid?: Boolean;
  nrFactura?: string;
  codCLient?: number;
  restDePlata?: number;
};

export type PaymentEntity = {
  id: number;
  date?: Date;
  amount?: number;
  userId: number;
  userName: string;
  codClient?: number;
  invoiceId?: number;
  adminId?: number;
  paymentMethod?: string;
};
