import { AdminData } from "../../store/types";
import httpClient from "../httpClient";

class AuthenticationService {
  static URL_PREFIX = "/admins";
  async login(email: string, password: string): Promise<AdminData> {
    const {
      data: { authToken, admin },
    } = await httpClient.post(
      AuthenticationService.URL_PREFIX + "/auth/login",
      {
        email,
        password,
      }
    );

    this.setAuthToken(authToken);
    return admin as AdminData;
  }

  async getAuthenticatedAdmin(): Promise<AdminData | undefined> {
    if (localStorage.getItem("authToken")) {
      const { data } = await httpClient.get<AdminData>(
        AuthenticationService.URL_PREFIX + "/auth/data"
      );
      return data;
    }
  }

  private setAuthToken(authToken: string) {
    localStorage.setItem("authToken", authToken);
  }
}

const authenticationService = new AuthenticationService();
export default authenticationService;
