import conf from "../conf/conf";
import { Client, Account, ID, Databases, Storage } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // CREATE-POST METHOD
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: CreatePost :: error", error);
    }
  }

  // UPDATE-POST METHOD
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      console.log("Appwrite service :: UpdatePost :: error", error);
    }
  }
  // DELETE-POST METHOD
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: DeletePost :: error", error);
      return false;
    }
  }

  // GET-POST METHOD
  async getPost(slug) {
    try {
      await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: GetPost :: error", error);
      return false;
    }
  }

  // GET-POSTS METHOD
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: GetPost :: error", error);
      return false;
    }
  }

  // FILE-UPLOAD METHOD
  async uploadFile(file) {
    try {
      await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
    } catch (error) {
      console.log("Appwrite service :: Fileupload :: error", error);
      return false;
    }
  }

  //DELETE-FILE METHOD
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: DeleteFile :: error", error);
      return false;
    }
  }

  //FILE_PREVIEW METHOD
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId);
  }
}

const service = new Service();

export default service;
