import { AxiosResponse } from "axios";
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
  ): Promise<
    { nrFactura: number; restDePlata: number; created_date: string }[]
  > {
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

  public static async deletePayment(id: number): Promise<Boolean> {
    return new Promise((resolve) => {
      axios.post(`${URL}/payments/delete/${id}`).then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async getCountUnpaidInvoices(
    codClient: number
  ): Promise<number> {
    return new Promise((resolve) => {
      axios.get(`${URL}/unpaid/count/${codClient}`).then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async getLastPaymentsByCodClient(
    codClient: number
  ): Promise<PaymentEntity[]> {
    return new Promise((resolve) => {
      axios.get(`${URL}/payments/${codClient}`).then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async downloadInvoice(
    nrFactura: string
  ): Promise<AxiosResponse<Blob>> {
    return new Promise((resolve, reject) => {
      axios
        .get(`${URL}/download-file?fileName=${nrFactura}`, {
          responseType: "blob",
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async exportInvoices(
    invoices: InvoiceEntity[]
  ): Promise<AxiosResponse<any>> {
    return new Promise((resolve, reject) => {
      axios
        .post(`${URL}/export`, invoices, {
          responseType: "blob",
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async exportPayments(
    payments: PaymentEntity[]
  ): Promise<AxiosResponse<any>> {
    return new Promise((resolve, reject) => {
      axios
        .post(`${URL}/payments/export`, payments, {
          responseType: "blob",
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async getAllInvoicesByCodClient(
    codClient: number
  ): Promise<InvoiceEntity[]> {
    return new Promise((resolve) => {
      axios.get(`${URL}/codClient/${codClient}`).then((response) => {
        resolve(response.data);
      });
    });
  }
}
