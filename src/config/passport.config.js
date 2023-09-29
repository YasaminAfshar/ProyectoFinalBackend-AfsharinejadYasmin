import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { logger } from "../utils/logger.js";
import UsersDao from "../persistence/daos/mongodb/users.dao.js";
const userDao = new UsersDao();

const strategyConfig = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

const signup = async (req, email, password, done) => {
  try {
    const findUser = await userDao.getUserByEmail(email);
    if (findUser.length > 0) {
      return done(null, false);
    } else {
      const newUser = await userDao.createUser(req.body);
      if (!newUser) {
        return done(null, false);
      } else {
        return done(null, newUser);
      }
    }
  } catch (error) {
    logger.error(error.message);
  }
};

const login = async (req, email, password, done) => {
  try {
    const user = { email, password };
    const userLogged = await userDao.loginUser(user);
    if (userLogged) {
      return done(null, userLogged);
    } else {
      return done(null, false);
    }
  } catch (error) {
    logger.error(error.message);
  }
};

const signupStrategy = new LocalStrategy(strategyConfig, signup);
const loginStrategy = new LocalStrategy(strategyConfig, login);

passport.use("register", signupStrategy);
passport.use("login", loginStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userDao.getUserById(id);
  return done(null, user);
});
