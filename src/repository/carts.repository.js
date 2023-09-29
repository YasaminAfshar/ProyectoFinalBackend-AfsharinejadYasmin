import CartsDaoMongo from "../persistence/daos/mongodb/carts.dao.js";
const cartsManager = new CartsDaoMongo();
import { logger } from "../utils/logger.js";

//import CartDaoFs from ".././persistence/daos/filesystem/carts.dao.js";
//const cartsManager = new CartDaoFs();

export const getCartsAllService = async () => {
  try {
    const docs = await cartsManager.getAllCart();
    return docs;
  } catch (error) {
      logger.error(error);
      throw new Error(error.message);
  }
};

export const getCartByIdService = async (cid) => {
  try {
    const doc = await cartsManager.getCartById(cid);
    //const doc = await cartsManager.getCartById(Number(cid));
    if (!doc)
      return `The cart you are searching width ID ${cid} could not be found!`;
    else return doc;
  } catch (error) {
      logger.error(error);
      throw new Error(error.message);
  }
};

export const createCartService = async () =>{
    try {
        const doc = await cartsManager.createCart();
        return doc;
    } catch (error) {
      logger.error(error);
      throw new Error(error.message);
    }
};

export const addProductToCartService = async (cid, pid) =>{
    try {
        const doc = await cartsManager.addProductToCart(cid, pid);
        //const doc = await cartsManager.addProductToCart(Number(cid), Number(pid));
        return doc;
    } catch (error) {
        logger.error(error);
        throw new Error(error.message);
    }
};

export const updateProductQuantityService = async(cid, pid, quantity) => {
  try {
      const doc = await cartsManager.updateProductQuantity(cid, pid, quantity);
      return doc;
  } catch (error) {
      logger.error(error);
      throw new Error(error.message);
  }
}


export const deleteProductToCartService = async (cid) => {
  try {
    const doc = await cartsManager.deleteProductToCart(cid);
    //const doc = await cartsManager.deleteProductToCart(Number(cid));
    return doc;
  } catch (error) {
      logger.error(error);
      throw new Error(error.message);
  }
};


export const deleteProductFromCartService = async (cid, pid) => {
  try {
    const doc = await cartsManager.deleteProductFromCart(cid, pid);
    //const doc = await cartsManager.deleteProductFromCart(Number(cid), Number(pid));
    return doc;
  } catch (error) {
      logger.error(error);
      throw new Error(error.message);
  }
};

