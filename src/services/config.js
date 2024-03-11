import { Client, Databases, ID, Storage, Query } from "appwrite";
import conf from "../conf/conf";

export class Service {
  client = new Client();
  dataBases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);
    this.dataBases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.dataBases.createDocument(
        conf.appWriteDataBaseId,
        conf.appWriteCollectionId,
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
      throw error;
    }
  }
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.dataBases.updateDocument(
        conf.appWriteDataBaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  async deletePost(slug) {
    try {
      await this.dataBases.deleteDocument(
        conf.appWriteDataBaseId,
        conf.appWriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.dataBases.getDocument(
        conf.appWriteDataBaseId,
        conf.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.dataBases.listDocuments(
        conf.appWriteDataBaseId,
        conf.appWriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("AppWrite service :: getPosts ", error);
      return false;
    }
  }

  //file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("bucket service createFile", error);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appWriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("bucket services deleteFile", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appWriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
