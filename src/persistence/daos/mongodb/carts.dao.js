import { CartsModel } from "./models/carts.model.js";
import { ProductsModel } from "./models/products.model.js";
import { logger } from "../../../utils/logger.js";

export default class CartsDaoMongo {
  async getAllCart() {
    try {
      const response = await CartsModel.find({}).populate("product.product");
      return response;
    } catch (error) {
      logger.error(error);
      throw new Error(error.message);
    }
  }

  async createCart(obj) {
    try {
      const response = await CartsModel.create(obj);
      return response;
    } catch (error) {
      logger.error(error);
      throw new Error(error.message);
    }
  }

  async getCartById(cid) {
    try {
      const response = await CartsModel.findById(cid).populate(
        "product.product"
      );
      return response;
    } catch (error) {
      logger.error(error);
      throw new Error(error.message);
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const findCart = await CartsModel.findById(cid);
      const findProduct = await ProductsModel.findById(pid);

      if (!findProduct) {
        throw new Error(`The requested product id ${pid} does not exist!`);
      } else {
        if (findCart) {
          const productExist = findCart.product.find(
            (product) => product.product.toString() === pid
          );
          if (!productExist) {
            const newProd = {
              quantity: 1,
              product: findProduct._id,
            };
            findCart.product.push(newProd);
          } else {
            const indexProduct = findCart.product.findIndex(
              (elemento) => elemento.product.toString() === pid
            );
            findCart.product[indexProduct].quantity += 1;
          }
          await findCart.save();
          return findCart;
        } else {
          throw new Error("The cart you are searching for does not exist!");
        }
      }
    } catch (error) {
      logger.error(error);
      throw new Error(error.message);
    }
  }

  async updateProductQuantity(cid, pid, quantity) {
    try {
      const cart = await CartsModel.findById(cid);
      if (!cart) {
        throw new Error("Cart not found");
      }

      const productToUpdate = cart.product.find(
        (product) => product.product.toString() === pid
      );
      if (!productToUpdate) {
        throw new Error("Product not found in cart");
      }

      productToUpdate.quantity = quantity;
      await cart.save();

      return cart;
    } catch (error) {
      logger.error(error);
      throw new Error(error.message);
    }
  }

  async deleteProductFromCart(cid, pid) {
    try {
      const findCart = await CartsModel.findById(cid);

      if (findCart) {
        const productIndex = findCart.product.findIndex(
          (product) => product.product.toString() === pid
        );
        if (productIndex !== -1) {
          findCart.product.splice(productIndex, 1);
          await findCart.save();
          return findCart;
        } else {
          throw new Error(
            "The product you are searching for does not exist in the cart!"
          );
        }
      } else {
        throw new Error("The cart you are searching for does not exist!");
      }
    } catch (error) {
      logger.error(error);
      throw new Error(error.message);
    }
  }

  async deleteProductToCart(cid) {
    try {
      const findCart = await CartsModel.findById(cid);
      if (findCart) {
        findCart.product = [];
        await findCart.save();
        return findCart;
      } else {
        throw new Error("The cart you are searching for does not exist!");
      }
    } catch (error) {
      logger.error(error);
      throw new Error(error.message);
    }
  }
}