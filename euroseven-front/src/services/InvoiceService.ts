import axios from "../axios";
import { InvoiceEntity, PaymentEntity } from "../types";

const URL = "http://localhost:8081/api/invoices";

export abstract class InvoiceService {
  public static async getAllInvoices(): Promise<InvoiceEntity[]> {
    return new Promise((resolve) => {
      axios.get(URL).then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async getInvoiceById(id: number): Promise<InvoiceEntity> {
    return new Promise((resolve) => {
      axios.get(URL + "/" + id).then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async getInvoiceByNrFactura(
    nrFactura: number
  ): Promise<InvoiceEntity> {
    return new Promise((resolve) => {
      axios.get(URL + "/nrFactura/" + nrFactura).then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async createInvoice(
    invoice: InvoiceEntity
  ): Promise<InvoiceEntity> {
    return new Promise((resolve) => {
      axios.post(URL + "/create", invoice).then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async deleteInvoice(id: number): Promise<Boolean> {
    return new Promise((resolve) => {
      axios.post(URL + "/delete/" + id).then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async searchInvoices(
    keyword: string
  ): Promise<InvoiceEntity[]> {
    return new Promise((resolve) => {
      axios.get(URL + "/search?keyword=" + keyword).then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async getAllPaidInvoices(): Promise<InvoiceEntity[]> {
    return new Promise((resolve) => {
      axios.get(URL + "/paid").then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async getAllUnpaidInvoices(): Promise<InvoiceEntity[]> {
    return new Promise((resolve) => {
      axios.get(URL + "/unpaid").then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async getAllPayments(): Promise<PaymentEntity[]> {
    return new Promise((resolve) => {
      axios.get(URL + "/payments").then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async registerPayment(
    payment: PaymentEntity
  ): Promise<PaymentEntity> {
    return new Promise((resolve) => {
      axios.post(URL + "/pay", payment).then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async getAllNrFacturiByCodClient(
    codClient: number
  ): Promise<{ nrFactura: number; restDePlata: number }[]> {
    return new Promise((resolve) => {
      axios.get(URL + `/nrFacturi/${codClient}`).then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async searchPaymentByNumeOrCodClient(
    keyword: string
  ): Promise<PaymentEntity[]> {
    return new Promise((resolve) => {
      axios
        .get(URL + "/payments/search?keyword=" + keyword)
        .then((response) => {
          resolve(response.data);
        });
    });
  }

  public static async updateInvoice(
    id: number,
    created_date: string,
    price: number,
    file: string
  ): Promise<InvoiceEntity> {
    return new Promise((resolve) => {
      axios
        .post(
          `${URL}/update/${id}?created_date=${created_date}&price=${price}&file=${file}`
        )
        .then((response) => {
          resolve(response.data);
        });
    });
  }
}
