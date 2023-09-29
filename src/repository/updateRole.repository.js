
import UsersDao from "../persistence/daos/mongodb/users.dao.js";
import { logger } from "../utils/logger.js";

const userDao = new UsersDao();

export const changeRoleToPremiumService = async (uid, role) => {
    try {
        const userExist = await userDao.getUserById(uid, role);
        if( !userExist ) {
            throw new Error("User could not be found!")
        }
        if (role === "premium") {
            userExist.isPremium = true;
            await userExist.save();
        } else {
            userExist.isPremium = false;
            await userExist.save();
        }
        const updatedRole = await userDao.updateRole(uid, role);
        return updatedRole;
    } catch (error) {
        logger.error(error);
        throw new Error(error.message);
    }
}