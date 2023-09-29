
const statusHTTP = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export class HttpResponse {
  Ok(res, data) {
    return res.status(statusHTTP.OK).json({
      status: statusHTTP.OK,
      message: "It has been a success, you can continue",
      data: data,
    });
  }

  badRequest(res, data) {
    return res.status(statusHTTP.BAD_REQUEST).json({
      status: statusHTTP.BAD_REQUEST,
      message: "Bad Request",
      error: data,
    });
  }

  notFound(res, data) {
    return res.status(statusHTTP.NOT_FOUND).json({
      status: statusHTTP.NOT_FOUND,
      message: "Data could not be found!",
      error: data,
    });
  }

  Unauthorized(res, data) {
    return res.status(statusHTTP.UNAUTHORIZED).json({
      status: statusHTTP.UNAUTHORIZED,
      message: "You are not authorized to access this endpoint or realize this type of action",
      error: data,
    });
  }

  Forbidden(res, data) {
    return res.status(statusHTTP.FORBIDDEN).json({
      status: statusHTTP.FORBIDDEN,
      message: "You are not authorized to access this endpoint!",
      error: data,
    });
  }

  ServerError(res, data) {
    return res.status(statusHTTP.INTERNAL_SERVER_ERROR).json({
      status: statusHTTP.INTERNAL_SERVER_ERROR,
      message: "Sorry, something went wrong on our end! Please, try again later!",
      error: data,
    });
  }
}