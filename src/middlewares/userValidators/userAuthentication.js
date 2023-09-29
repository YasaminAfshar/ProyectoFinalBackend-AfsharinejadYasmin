
import { HttpResponse } from "../errorHandlers/http.response.js";
const httpResponse = new HttpResponse();

export const authorizedAdmin = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return httpResponse.Forbidden(res, "Unauthorized: Not logged in");
  }
  if (req.user.role !== "admin") {
    return httpResponse.Forbidden(
      res,
      "Unauthorized: Only admins are allowed to use this endpoint"
    );
  }
  return next();
  
};

export const authorizedUser = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return httpResponse.Forbidden(res, "Unauthorized: Not logged in");
  }
  if (req.user.role === "user" || req.user.role === "premium") {
    return next();
  } else {
    return httpResponse.Forbidden(res,"Unauthorized: Only users are allowed to use this endpoint");
  }
   
}; 

export const authorizedPremium = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return httpResponse.Forbidden(res, "Unauthorized: Not logged in");
  }

  if (req.user.role === "admin" || req.user.role === "premium") {
    return next();
  } else {
    return httpResponse.Forbidden(
      res,
      "Unauthorized: Only admins or premium users are allowed to use this endpoint"
    );
  }
}; 