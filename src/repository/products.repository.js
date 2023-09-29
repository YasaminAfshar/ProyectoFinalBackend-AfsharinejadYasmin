
import ProductsDaoMongo from "../persistence/daos/mongodb/products.dao.js";
const productsManager = new ProductsDaoMongo();
import { logger } from "../utils/logger.js";

//import ProductDaoFs from ".././persistence/daos/filesystem/products.dao.js";
//const productsManager = new ProductDaoFs();


export const getAllProductsService = async (page, limit, sort, filter) => {
  try {
    const docs = await productsManager.getProducts(page, limit, sort, filter);
    return docs;
  } catch (error) {
      logger.error(error);
      throw new Error(error.message);
  }
};

export const getProductByIdService = async (id) => {
  try {
    const doc = await productsManager.getProductById(id);
    return doc;
  } catch (error) {
      logger.error(error);
      throw new Error(error.message);
  }
};

export const checkDuplicateCode = async (code) =>{
    try {
        const doc = await productsManager.checkDuplicateCode(code);
        if (doc) {
          throw new Error (`There is already a product with the code ${code}!`);
        }
    } catch (error) {
        logger.error(error);
        throw new Error(error.message);
    }
}  

export const addProductService = async (obj) => {
  try {
    const newProduct = await productsManager.addProduct(obj);
    if (!newProduct)
      throw new Error(
        "There is an error created because one of the fields is missing or invalid"
      );
    else return newProduct;
  } catch (error) {
      logger.error(error);
      throw new Error(error.message);
  }
};

export const updateProductService = async (
  id, obj ) => {
  try {
    const doc = await productsManager.getProductById(id);
    if (!doc) {
      return (`The product you are searching width ID ${id} could not be found!`);
    } else {
      const prodUpdated = await productsManager.updateProduct(
        id,
        obj
      );
      return prodUpdated;
    }
  } catch (error) {
      logger.error(error);
      throw new Error(error.message);
  }
};

export const deleteProductService = async (id) => {
  try {
    const doc = await productsManager.getProductById(id);

    if (!doc) {
      return `The product you are searching width ID ${id} could not be found!`;
    } else {
      return await productsManager.deleteProduct(id);
    }
  } catch (error) {
      logger.error(error);
      throw new Error(error.message);
    }
};

