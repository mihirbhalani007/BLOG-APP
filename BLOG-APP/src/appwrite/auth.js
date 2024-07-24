import conf from "../confs/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
    // console.log("Account instance:", this.account);
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
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      console.log("Creating email session with:", email, password); // Debug log
      console.log("Account instance methods:", this.account); // Debug log
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  updatePassword = async (newPassword, oldPassword = "") => {
    try {
      // Client-side validation for password length
      if (newPassword.length < 8 || newPassword.length > 265) {
        throw new Error("Password must be between 8 and 265 characters long.");
      }

      const response = await this.account.updatePassword(
        newPassword,
        oldPassword
      );
      console.log("Password updated successfully", response);
      return response; // Optionally return response if needed
    } catch (error) {
      console.error("Error updating password:", error);
      throw error; // Re-throw error for handling in calling code
    }
  };

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
