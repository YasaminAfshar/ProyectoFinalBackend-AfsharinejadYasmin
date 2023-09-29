
import { logger } from "../utils/logger.js";
import { changeRoleToPremiumService } from "../repository/updateRole.repository.js";
import UsersDao from "../persistence/daos/mongodb/users.dao.js";
const userDao = new UsersDao();

import { HttpResponse } from "../middlewares/errorHandlers/http.response.js";
const httpResponse = new HttpResponse();


export const registerController = async (req, res, next) => {
  try {
    res.render("register");
  } catch (error) {
    next(error);
  }
};
export const loginController = async (req, res, next) => {
  try {
    res.render("login");
  } catch (error) {
    next(error);
  }
};
export const registerErrorController = async (req, res, next) => {
  try {
    res.render("registerError");
  } catch (error) {
    next(error);
  }
};
export const loginErrorController = async (req, res, next) => {
  try {
    res.render("loginError");
  } catch (error) {
    next(error);
  }
};
export const createUserController = async (req, res, next) => {
  try {
    const session = req.session;
    if (!session) {
      //res.redirect("/views/register-error");
      return httpResponse.notFound(res, "The user can not register correctly!" );
    } else {
      //res.redirect("/views/login");
      return httpResponse.Ok(res, "Registration has been completed successfully!");
    }
  } catch (error) {
    next(error);
  }
};
export const loginUserController = async (req, res, next) => {
  try {
    const userData = req.body;
    const user = await userDao.loginUser(userData);
    if (!user) {
      //res.redirect("/views/login-error");
      return httpResponse.badRequest(res, "The user can not log in correctly because we can not find the email written in the database!");
    } else {
      const userId = await userDao.getUserById(req.session.passport.user);
      const userLogged = {
        id: userId._id,
        firstName: userId.firstName,
        lastName: userId.lastName,
        email: userId.email,
        role: userId.role,
        cart: user.cart,
        lastConnection: userId.lastConnection,
      };

      req.session.user = userLogged;
      logger.info(`User whose fullname is ${user.firstName} ${user.lastName} logged in successfully!`);
      return httpResponse.Ok(res, userLogged);
      //res.redirect("/products");
    }
  } catch (error) {
    next(error);
  }
};
export const logoutUserController = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        logger.error(err);
        return httpResponse.ServerError(res, err.message);
      } else {
        //res.redirect("/views/login");
        logger.info("¡Logout successfully!");
        return httpResponse.Ok(res, "¡Logout successfully!");
      }
    });
  } catch (error) {
    next(error);
  }
};

export const githubResponseController = async (req, res, next) => {
  try {
    const { firstName, lastName, email, role, isGithub, isPremium, cart, lastConnection } = req.user;
    const userLogged = {
      firstName,
      lastName,
      email,
      role,
      isGithub,
      isPremium,
      cart,
      lastConnection,
    };
    req.session.user = userLogged;
    //logger.info({message: "Login with Github successfully!", session: req.session});
    logger.info (`Login with Github ${req.session.user.firstName} ${req.session.user.lastName} successfully! `);
    res.redirect("/products");
  } catch (error) {
    next(error);
  }
};

export const getAllUsersController = async (req, res, next) => {
  try {
    const docs = await userDao.getAllUsers();
    if (docs.length === 0) {
      return httpResponse.badRequest(res, "We couldn't find any user");
    } else {
      return httpResponse.Ok(res, docs);
    }
  } catch (error) {
    next(error);
  }
};

export const updateRoleToPremiumController= async (req, res, next) => {
  try {
    const {uid} = req.params;
    const user = await userDao.getUserById(uid);
    const newRole = user.role === "user" ? "premium" : "user";
    const updatedRole = await changeRoleToPremiumService(uid, newRole);
    return httpResponse.Ok(res, `El usuario ha cambiado de rol a: ${updatedRole}`)
  } catch (error) {
    next(error);
  }
}

export const deleteUserInactiveController = async (req, res, next) => {
  try {
    const cleaning = await userDao.deleteUsersInactive();
    return httpResponse.Ok(res, cleaning);
  } catch (error) {
    next(error);
  }
}