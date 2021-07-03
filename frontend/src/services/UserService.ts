import $api from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../models/AuthResponse";

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get("/users");
  }
}
