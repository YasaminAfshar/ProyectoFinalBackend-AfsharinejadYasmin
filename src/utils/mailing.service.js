import { createTransport } from "nodemailer";
import config from "../config.js";
import { logger } from "./logger.js";

import { getTicketByCodeService} from ".././repository/ticket.repository.js";

const transporter = createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: config.EMAIL,
    pass: config.PASSWORD,
  },
});

const createMsgRegister = (firstName) => {
  return `<h1>¡Hola ${firstName}, Bienvenido/a a la Tienda Online Mundo Lana!</h1>`;
};

const msgUserEliminated = (firstName) => {
  return `<h1>¡Hola ${firstName}, se hace aviso que se ha eliminado su cuenta de la tienda Mundo Lana por presentar 48hs de inactividad!</h1>`;
};

const msgProductEliminated = (firstName, lastName) => {
  return `<h1>¡Hola ${firstName} ${lastName}, se hace aviso que se ha eliminado un producto creado por usted como usuario premium de nuestra colección!</h1>`;
};


export const sendMail = async (user) => {
  try {
    const { firstName, email } = user;

    const gmailOptions = {
      from: config.EMAIL,
      to: email,
      subject: "Bienvenido/a a nuestro Ecommerce",
      html: createMsgRegister(firstName),
    };

    const response = await transporter.sendMail(gmailOptions);
    logger.info("¡Se ha enviado el email correctamente!", response);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const ticketMail = async (code) => {
  try {
    const ticket = await getTicketByCodeService(code);
    const gmailOptions = {
      from: config.EMAIL,
      to: ticket.purchaser,
      subject: "Compra realizada con exito!!",
      html: `
            <div class='card'>
                <h1>Ticket de compra</h1>
                <p><strong>Código del ticket: </strong>${ticket.code}</p>
                <p><strong>Email del cliente: </strong>${ticket.purchaser}</p>
                <p><strong>Fecha y hora de la compra: </strong> ${ticket.purchaseDateTime} </p>
                <p><strong>Total pagado: </strong> $${ticket.amount} </p>
            </div>
            `,
    };

    logger.info("¡Se ha enviado el email de ticket generado al usuario correctamente!");
    await transporter.sendMail(gmailOptions);
  } catch (error) {
    throw new Error(error.message);
  }
}

export const deleteUsersMail = async (user) => {
  try {
    const { firstName, email } = user;
    const gmailOptions = {
      from: config.EMAIL,
      to: email,
      subject: "Aviso de eliminiación de cuenta en la ¡Tienda online Mundo Lana!",
      html: msgUserEliminated(firstName),
    };

    logger.info("¡Se ha enviado el email de eliminación del usuario por inactividad correctamente!");
    await transporter.sendMail(gmailOptions);
  } catch (error) {
    throw new Error(error.message);
  }
}

export const deleteProductMail = async (user) => {
  try {
    const { firstName, lastName, email } = user;
    const gmailOptions = {
      from: config.EMAIL,
      to: email,
      subject: `Aviso de eliminiación de un producto!`,
      html: msgProductEliminated(firstName, lastName),
    };

    logger.info(
      "¡Se ha enviado el email de eliminación del producto creado por usuario premium correctamente!"
    );
    await transporter.sendMail(gmailOptions);
  } catch (error) {
    throw new Error(error.message);
  }
};