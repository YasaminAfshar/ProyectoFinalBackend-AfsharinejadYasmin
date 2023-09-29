import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import config from "../config.js";

import UsersDao from "../persistence/daos/mongodb/users.dao.js";
const userDao = new UsersDao();

const strategyOptions = {
  clientID: config.CLIENT_ID_GITHUB,
  clientSecret: config.CLIENT_SECRET_GITHUB,
  callbackURL: "http://localhost:8080/api/users/github-profile",
};

const registerOrLogin = async (accesToken, refreshToken, profile, done) => {
  const email =
    profile._json.email !== null ? profile._json.email : profile._json.blog;
  let user = await userDao.getUserByEmail(email);
  if (user) return done(null, user);
  const newUser = await userDao.createUser({
    firstName: profile._json.name?.split(" ")[0],
    lastName: profile._json.name?.split(" ")[1],
    email: email,
    password: " ",
    isGithub: true,
  });
  return done(null, newUser);
};

const githubStrategy = new GithubStrategy(strategyOptions, registerOrLogin);
passport.use("github", githubStrategy);
