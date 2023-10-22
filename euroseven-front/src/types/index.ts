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
  judet?: string;
  localitate?: string | null;
  phone?: string;
  image?: string;
  restDePlataTotal?: number;
};

export type InvoiceEntity = {
  id?: number;
  created_date?: string | null;
  due_date?: string | null;
  price?: number;
  file?: string;
  paid?: Boolean;
  nrFactura?: string;
  codClient?: number | null;
  restDePlata?: number;
  indexNou?: number;
  indexVechi?: number;
};

export type PaymentEntity = {
  id?: number;
  date?: string | null;
  amount?: number;
  userId?: number;
  userName?: string;
  codClient?: number;
  nrFactura?: number;
  incasariId?: number;
  paymentMethod?: string;
};
