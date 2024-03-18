import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        this.email({ email, password });
      } else {
        return;
      }
    } catch (error) {
      throw error;
    }
  }

  async logIn({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
     console.log(`auth service login erros !! ${error.message}`);
    }
  }
  async getCurrentUser() {
    try {
      const res = await this.account.get();
      res ? res : null;
    } catch (error) {
      console.log(`auth service getCurrentUser erros !! ${error}`);
    }
  }
  async logOut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
