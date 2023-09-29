import { HttpResponse } from "./http.response.js";
const httpResponse = new HttpResponse(); 

export const errorHandler = (error, req, res, next) => {
    console.log(`error ${error.message}`);
    if (res.status === 400) {
        return httpResponse.badRequest(res, error.message);
    } else if (res.status === 401){
        return httpResponse.Unauthorized(res, error.message);
    } else if (res.status === 403){
        return httpResponse.Forbidden(res, error.message);
    } else if (res.status === 404){
        return httpResponse.notFound(res, error.message);
    } else {
        return httpResponse.ServerError(res, error.message);
    }
};
