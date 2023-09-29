import { Router } from "express";
import {
  createUserController,
  loginUserController,
  logoutUserController,
  githubResponseController,
  getAllUsersController,
  updateRoleToPremiumController,
  deleteUserInactiveController,
} from "../controllers/users.controllers.js";
import passport from "passport";
import { validateRegister } from "../middlewares/validators/user.validator.js";
import { authorizedAdmin } from "../middlewares/userValidators/userAuthentication.js";

const router = Router();

router.post("/register", validateRegister, passport.authenticate("register"), createUserController);
router.post("/login",  passport.authenticate("login"), loginUserController);
router.post("/logout", logoutUserController);
router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/github-profile', passport.authenticate('github', { scope: [ 'user:email' ] }), githubResponseController);
router.get("/", getAllUsersController);
router.put("/premium/:uid", updateRoleToPremiumController);
router.delete("/delete",authorizedAdmin, deleteUserInactiveController);

export default router;
