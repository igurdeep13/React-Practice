import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  // Create Account Method
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // Call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  // Login Method
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // Get Current User
  async getCurrentUser() {
    try {
      // Attempt to get the current user's account
      const user = await this.account.get();
      return user;
    } catch (error) {
      if (error.code === 401) {
        // Specific handling for unauthorized access
        console.log("User is not authenticated. Please log in.");
      } else if (error.code === 403) {
        // Specific handling for forbidden access (missing scopes)
        console.log("Access denied. Ensure the user has the required scopes.");
      } else {
        // Log any unexpected errors
        console.log(
          "Appwrite service :: getCurrentUser :: unexpected error",
          error
        );
      }
    }

    // Return null if no user is authenticated or an error occurs
    return null;
  }

  // Delete Session or Logout
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
