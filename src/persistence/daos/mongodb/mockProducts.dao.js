import { mockProductsModel } from "./models/mockProduct.model.js";
import { generateProducts } from "../../../path.js";
import { logger } from "../../../utils/logger.js";
export default class mockProductsDaoMongo {
  async getAllProductsMock(page = 1, limit = 20, sort, filter) {
    try {
      if (sort == "asc" || sort == "desc") {
        const response = await mockProductsModel.paginate(
          filter != undefined ? { category: filter } : {},
          { page, limit, sort: { price: sort } }
        );
        return response;
      } else if (sort != "asc" && sort != "desc") {
        const response = await mockProductsModel.paginate(
          filter != undefined ? { category: filter } : {},
          { page, limit }
        );
        return response;
      }
    } catch (error) {
      logger.error(error);
      throw new Error(error.message);
    }
  }

  async createProductMock(cant = 100) {
    try {
      const productsArray = [];
      for (let i = 0; i < cant; i++) {
        const productMock = generateProducts();
        productsArray.push(productMock);
      }
      const result = await mockProductsModel.create(productsArray);
      return result;
    } catch (error) {
      logger.error(error);
      throw new Error(error.message);
    }
  }
}
