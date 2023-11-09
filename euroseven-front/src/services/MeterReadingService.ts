import { AxiosResponse } from "axios";
import axios from "../axios";
import { MeterReadingEntity } from "../types";

const URL = "http://localhost:8081/api/meter-readings";

export abstract class MeterReadingService {
  public static async getAllMeterReadings(): Promise<MeterReadingEntity[]> {
    return new Promise((resolve) => {
      axios.get(URL).then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async createMeterReading(
    meterReading: MeterReadingEntity
  ): Promise<MeterReadingEntity | null> {
    return new Promise((resolve, reject) => {
      axios
        .post(URL + "/create", meterReading)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          // Handle the error according to your needs, logging, or processing it further
          console.error("Error in createMeterReading:", error);
          reject(error); // Reject the promise on error
        });
    });
  }

  public static async getMeterReadingsByCodClient(
    codClient: number
  ): Promise<MeterReadingEntity[]> {
    return new Promise((resolve) => {
      axios.get(URL + "/cod-client/" + codClient).then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async getMeterReadingById(
    id: number
  ): Promise<MeterReadingEntity> {
    return new Promise((resolve) => {
      axios.get(URL + "/" + id).then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async acceptMeterReading(
    id: number,
    codClient: number
  ): Promise<Boolean> {
    return new Promise((resolve) => {
      axios.post(URL + "/accept/" + id + "/" + codClient).then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async exportMeterReadings(
    meterReadings: MeterReadingEntity[]
  ): Promise<AxiosResponse<any>> {
    return new Promise((resolve, reject) => {
      axios
        .post(URL + "/export", meterReadings, {
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
}
