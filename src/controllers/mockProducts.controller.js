import { getAllProductsMockService, createProductMockService} from "../repository/mockProducts.repository.js";
import { HttpResponse } from "../middlewares/errorHandlers/http.response.js";
const httpResponse = new HttpResponse();

export const getAllProductsMockController = async (req, res, next) => {
  try {
    let { page, limit, sort, filter } = req.query;
    page == null ? (page = 1) : (page = page);
    const result = await getAllProductsMockService(page, limit, sort, filter);
    const prevPageLink = result.hasPrevPage
      ? `http://localhost:8080/mockingproducts?page=${result.prevPage}`
      : null;
    const nextPageLink = result.hasNextPage
      ? `http://localhost:8080/mockingproducts?page=${result.nextPage}`
      : null;

    const data = {
      docs: result.docs,
      info: {
        totalDocs: result.totalDocs,
        totalPages: result.totalPages,
        currPage: Number(page),
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPageLink,
        nextPageLink,
      },
    };

    return httpResponse.Ok(res, data);

  } catch (error) {
    next(error);
  }
};


export const createProductMockController = async (req, res, next) => {
  try {
    const { cant } = req.query;
    const result = await createProductMockService(cant);
    return httpResponse.Ok(res, result);
  } catch (error) {
    next(error);
  }
};