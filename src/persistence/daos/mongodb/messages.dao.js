import { MessagesModel } from "./models/messages.model.js";
import { logger } from "../../../utils/logger.js";
export default class MessagesDaoMongo {
  async getAllMessages() {
    try {
      const response = await MessagesModel.find({});
      return response;
    } catch (error) {
      logger.error(error);
      throw new Error(error.message);
    }
  }

  async createMessage(userName, message) {
    try {
      const newMessage = await MessagesModel.create({
        userName: userName,
        message: message,
      });
      return newMessage;
    } catch (error) {
      logger.error(error);
      throw new Error(error.message);
    }
  }

  async getMessageById(id) {
    try {
      const response = await MessagesModel.findById(id);
      return response;
    } catch (error) {
      logger.error(error);
      throw new Error(error.message);
    }
  }

}