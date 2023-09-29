
import { HttpResponse } from "../middlewares/errorHandlers/http.response.js";
const httpResponse = new HttpResponse();

import {
  getCartsAllService,
  getCartByIdService,
  createCartService,
  addProductToCartService,
  deleteProductToCartService,
  deleteProductFromCartService,
  updateProductQuantityService,
} from "../repository/carts.repository.js";

import {getProductByIdService} from "../repository/products.repository.js";

export const getCartsController = async (req, res, next) => {
    try {
        const docs = await getCartsAllService();
        if (docs.length === 0) {
          return httpResponse.badRequest(res, "We couldn't find any cart");
        } else {
          return httpResponse.Ok(res, docs);
        }
    } catch (error) {
        next(error);
    }
}

export const getCartByIdController = async (req, res, next) => {
  try {
     const { cid } = req.params;
     //const docs = await getCartByIdService(Number(cid));
     const docs = await getCartByIdService(cid);
     return httpResponse.Ok(res, docs)
  } catch (error) {
    next(error);
  }
};

export const createCartController = async (req, res, next) => {
  try {
    const docs = await createCartService();
    return httpResponse.Ok(res, docs);
  } catch (error) {
    next(error);
  }
};

export const addProductToCartController = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const product = await getProductByIdService(pid);
    if (req.user.email === product.owner) {
      return httpResponse.Forbidden(res, "You cannot add a product that belongs to you to your cart by being a premium user");
    }
    const cart = await addProductToCartService(cid,pid);
    //const product = await addProductToCartService(Number(cid), Number(pid));
    if (cart) {
      return httpResponse.Ok(res, cart);
    } else {
      return httpResponse.notFound(res, "The product or cart you are searching for could not be found!");
    } 
  } catch (error) {
    next(error);
  }
};

export const updateProductQuantityController = async (req,res, next) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const updatedCart = await updateProductQuantityService(cid, pid, quantity);
    if (!updatedCart) {
      return httpResponse.notFound(res, "Cart or product not found");
    }
    return httpResponse.Ok(res, updatedCart);

  } catch (error) {
    next(error);
  }
}

export const deleteProductToCartController = async (req, res, next) => {
  try {
    const {cid} = req.params;
    const productsDeleted = await deleteProductToCartService(cid); 
    //const productsDeleted = await deleteProductToCartService(Number(cid)); 
    if (productsDeleted ) {
      return httpResponse.Ok(res, "The cart has been deleted successfully!");
    } else {
      return httpResponse.notFound(res, "The cart you are searching for could not be found!");
    } 
  } catch (error) {
      next(error);
  }
}

export const deleteProductFromCartController = async (req, res, next) => {
  try {
    const {cid, pid} = req.params;
    const productDeleted = await deleteProductFromCartService(cid,pid); 
    //const productDeleted = await deleteProductFromCartService(Number(cid), Number(pid)); 
    if (productDeleted ) {
      return httpResponse.Ok(res, "The product/s you have selected has/have been successfully deleted from cart!");
    } else {
      return httpResponse.notFound(res, "The product or cart you are searching for could not be found!");
    } 
  } catch (error) {
      next(error);
  }
}

