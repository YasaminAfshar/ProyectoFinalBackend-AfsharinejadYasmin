
import TicketDaoMongo from "../persistence/daos/mongodb/ticket.dao.js";
import { logger } from "../utils/logger.js";

const ticketDao = new TicketDaoMongo();

export const createTicketService = async (ticketData) => {
    try {
      const ticket = await ticketDao.createTicket(ticketData);
      return ticket;
    } catch (error) {
        logger.error(error);
        throw new Error(error.message);
    }
}

export const getTicketByCodeService = async (code) => {
  try {
    const ticket = await ticketDao.getTicketByCode(code);
    return ticket;
  } catch (error) {
    logger.error(error);
    throw new Error(error.message);
  }
};

export const createCodeTicketService = async () => {
  try {
    const ticket = await ticketDao.createCodeTicket();
    return ticket;
  } catch (error) {
      logger.error(error);
      throw new Error(error.message);
  }
}
