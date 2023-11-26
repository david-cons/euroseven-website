import axios from "../axios";
import { NotificationEntity } from "../types";

const URL = "http://34.147.113.108:8081/api/notifications";

export abstract class NotificationService {
  public static async completeInvoice(id: number): Promise<NotificationEntity> {
    return new Promise((resolve) => {
      axios.post(URL + "/complete/" + id).then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async getAllUncompletedNotifications(
    codClient: number
  ): Promise<NotificationEntity[]> {
    return new Promise((resolve) => {
      axios.get(URL + "/" + codClient).then((response) => {
        resolve(response.data);
      });
    });
  }
}
