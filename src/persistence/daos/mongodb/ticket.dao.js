
import { TicketModel } from "./models/ticket.model.js";
import { logger } from "../../../utils/logger.js";
export default class TicketDaoMongo {
  async createCodeTicket() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const codeLength = 6;
    let code = "";

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    return code;
  }

  async createTicket(ticketData) {
    try {
      const response = await TicketModel.create(ticketData);
      return response;
    } catch (error) {
      logger.error(error);
      throw new Error(error.message);
    }
  }

  async getTicketByCode(code) {
    try {
      const response = await TicketModel.findOne({ code: code });
      return response;
    } catch (error) {
      logger.error(error);
      throw new Error(error.message);
    }
  }
}