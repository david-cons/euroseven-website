import { UserEntity } from "../types";
import axios from "../axios";

const URL = "http://34.147.113.108:8081/api/users";

export abstract class UserService {
  public static async getAllUsers(): Promise<UserEntity[]> {
    return new Promise((resolve) => {
      axios.get(URL).then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async getUserById(id: number): Promise<UserEntity> {
    return new Promise((resolve) => {
      axios.get(URL + "/" + id).then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async searchUsers(keyword: string): Promise<UserEntity[]> {
    return new Promise((resolve) => {
      axios.get(URL + "/search?keyword=" + keyword).then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async deleteUser(id: number): Promise<Boolean> {
    return new Promise((resolve) => {
      axios.delete(URL + "/delete/" + id).then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async updateUser(
    id: number | undefined,
    name: string,
    address: string | undefined,
    judet: string | undefined | null,
    localitate: string | undefined | null,
    phone: string | undefined
  ): Promise<UserEntity> {
    return new Promise((resolve) => {
      axios
        .post(URL + "/update/" + id, { name, address, localitate, phone })
        .then((response) => {
          resolve(response.data);
        });
    });
  }

  public static async toggleUser(id: number): Promise<UserEntity> {
    return new Promise((resolve) => {
      axios.post(URL + "/toggle/" + id).then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async uploadImage(
    picture: File | null,
    id: number | undefined
  ): Promise<UserEntity | null> {
    return new Promise((resolve) => {
      if (!picture) {
        // Handle the case where picture is undefined
        resolve(null);
        return;
      }

      const formData = new FormData();
      formData.append("picture", picture);

      axios
        .post(`${URL}/upload/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          resolve(null); // Handle the error gracefully
        });
    });
  }

  public static async getImage(id: number | undefined): Promise<any> {
    return new Promise((resolve) => {
      axios.get(`${URL}/${id}/image`).then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async getCoduriClienti(): Promise<number[]> {
    return new Promise((resolve) => {
      axios.get(URL + "/coduriClienti").then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async getUserByCodClient(
    codClient: number
  ): Promise<UserEntity> {
    return new Promise((resolve) => {
      axios.get(URL + "/codClient/" + codClient).then((response) => {
        resolve(response.data);
      });
    });
  }

  public static async addSaldoToUser(
    id: number,
    AddSaldoDTO: { amount: number }
  ): Promise<UserEntity> {
    return new Promise((resolve) => {
      axios
        .post(URL + "/" + id + "/add-saldo", AddSaldoDTO)
        .then((response) => {
          resolve(response.data);
        });
    });
  }
}
