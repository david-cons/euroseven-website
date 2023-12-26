export type UserEntity = {
  id: number;
  username: string; //email
  password: string;
  inactive?: boolean;
  role?: string;
  name?: string;
  codClient?: number;
  address?: string;
  judet?: string;
  localitate?: string | null;
  phone?: string;
  image?: string;
  restDePlataTotal?: number;
  indexVechi?: number;
  indexNou?: number;
  defaultPassword?: Boolean;
};

export type InvoiceEntity = {
  id?: number;
  created_date?: string | null;
  due_date?: string | null;
  price?: number;
  file?: string;
  status?: string;
  location?: string;
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

export type MeterReadingEntity = {
  id?: number;
  serieContor?: string;
  indexVechi?: number;
  indexNou?: number;
  codClient?: number;
  date?: string | null;
  picture?: string | null;
  accepted?: Boolean;
};

export type NotificationEntity = {
  id?: number;
  content?: string;
  codClient?: number;
  completed?: boolean;
};

export type ConsumEntity = {
  id: number;
  cod: string;
  nrFactura: string;
  dePlata: string;
  indexVechi: string;
  indexNou: string;
  consumT: string;
  perioada: string;
}