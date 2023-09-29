
import mockProductsDaoMongo from "../persistence/daos/mongodb/mockProducts.dao.js"; 
const mockProducts = new mockProductsDaoMongo();
import { logger } from "../utils/logger.js";

export const getAllProductsMockService = async (page, limit, sort, filter) => {
  try {
    const docs = await mockProducts.getAllProductsMock(page, limit, sort, filter);
    return docs;
  } catch (error) {
      logger.error(error);
      throw new Error(error.message);
  }
};

export const createProductMockService = async (cant) => {
    try {
        const docs = await mockProducts.createProductMock(cant);
        return docs;
    } catch (error) {
        logger.error(error);
        throw new Error(error.message);
    }
}