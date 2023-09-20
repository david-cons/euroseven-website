import axios from "../axios";
import { InvoiceEntity } from "../types";

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
    nrFactura: number
  ): Promise<InvoiceEntity[]> {
    return new Promise((resolve) => {
      axios.get(URL + "/search?nrFactura=" + nrFactura).then((response) => {
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
}
