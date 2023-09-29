
import { HttpResponse } from "../middlewares/errorHandlers/http.response.js";
const httpResponse = new HttpResponse();

import {
  createTicketService,
  createCodeTicketService,
  getTicketByCodeService,
} from "../repository/ticket.repository.js";

import { getCartByIdService } from "../repository/carts.repository.js";
import { ticketMail } from "../utils/mailing.service.js";

export const finalizePurchase = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await getCartByIdService(cid);
    if (!cart)
      return httpResponse.notFound(
        res,
        "The cart you are searching for could not be found!"
      );

    const productsToPurchase = cart.product;
    const productsWithoutStock = [];
    const ticketsProducts = [];
    for (const productItem of productsToPurchase) {
      const product = productItem.product;
      if (product.stock < productItem.quantity) {
        productsWithoutStock.push(product._id);
      } else {
        const purchasedQuantity = productItem.quantity;
        product.stock -= purchasedQuantity;
        ticketsProducts.push({
          product: product._id,
          quantity: purchasedQuantity,
          subtotal: product.price * purchasedQuantity,
        });
        await product.save();
      }
    }

    const totalAmount = ticketsProducts.reduce(
      (acc, curr) => acc + curr.subtotal,
      0
    );
    const actualTime = new Date().toLocaleString();
    const ticketData = {
      code: await createCodeTicketService(),
      purchaseDateTime: actualTime,
      amount: totalAmount,
      purchaser: req.user.email,
      productsPurchased: ticketsProducts,
    };

    const ticket = await createTicketService(ticketData);
    const productsNotPurchased = productsToPurchase.filter((productItem) =>
      productsWithoutStock.includes(productItem.product._id)
    );
    cart.product = productsNotPurchased;
    await cart.save();
    await ticketMail(ticket.code);
    return httpResponse.Ok(res, ticket);
  } catch (error) {
    next(error);
  }
};

export const getTicketByCodeController = async(req, res, next) => {
  try {
    const { code } = req.params;
    const ticket = await getTicketByCodeService(code);
    if (!ticket) {
      logger.error(`Ticket with ${code} code could not be found`);
      return httpResponse.NotFound(res, `Ticket with ${code} code could not be found!`);
    } else return httpResponse.Ok(res, ticket);
  } catch (error) {
    next(error);
  }
}