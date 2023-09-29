import {
  getAllProductsService,
  getProductByIdService,
  addProductService,
  updateProductService,
  deleteProductService,
  checkDuplicateCode
} from "../repository/products.repository.js";

import UsersDao from "../persistence/daos/mongodb/users.dao.js";
const userDao = new UsersDao();

import { HttpResponse } from "../middlewares/errorHandlers/http.response.js";
const httpResponse = new HttpResponse();

import { deleteProductMail} from ".././utils/mailing.service.js"

export const getProductController = async (req, res, next) => {
  try {
    /*const docs = await getAllProductsService();
    const { limit } = req.query;
    const productsLimit = docs.slice(0, parseInt(limit));
    if (!limit) {
      res.status(200).send(docs);
    } else {
      res.status(200).send(productsLimit);
    }  */

    let { page, limit, sort, filter } = req.query;
    page == null ? (page = 1) : (page = page);
    const result = await getAllProductsService(page, limit, sort, filter);
    const prevPageLink = result.hasPrevPage
      ? `http://localhost:8080/api/products?page=${result.prevPage}`
      : null;
    const nextPageLink = result.hasNextPage
      ? `http://localhost:8080/api/products?page=${result.nextPage}`
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

export const getProductByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const docs = await getProductByIdService(id);
    if(docs){
      return httpResponse.Ok(res, docs);
    } else {
        return httpResponse.notFound(res, `No se ha encontrado el producto cuyo id es ${id}`);
    }
  } catch (error) {
    next(error);
  }
};

export const addProductController = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      code,
      category,
      stock,
      thumbnails,
      status = true
    } = req.body;

    await checkDuplicateCode(code);
     if (req.user.role === 'admin' || req.user.role === "premium") {
        const newDoc = await addProductService({
          title,
          description,
          price,
          code,
          category,
          stock,
          thumbnails,
          status,
          owner: req.user.email ? req.user.email : "admin",
        });
        return httpResponse.Ok(res, newDoc);
     } else {
      return httpResponse.Forbidden(res, "You do not have permission to create products because your role don't permitted!")
     }
    
  } catch (error) {
    next(error);
  }
};

export const updateProductController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      code,
      category,
      stock,
      thumbnails,
      status,
    } = req.body;
    
    await getProductByIdService(id);

    const prodUpdated = await updateProductService(id, {
      title,
      description,
      price,
      code,
      category,
      stock,
      thumbnails,
      status,
    });
    return httpResponse.Ok(res, prodUpdated);
  } catch (error) {
    next(error);
  }
};

export const deleteProductController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdService(id);
    const user = await userDao.getUserByEmail(product.owner);
    if (req.user.role === 'admin'|| req.user.email === product.owner ) {
      await deleteProductService(id);
      if (user.isPremium === true) await deleteProductMail(user);
      return httpResponse.Ok(res, `The product width ID ${id} was deleted successfully!`);
    } else {
      return httpResponse.Forbidden(res, "You do not have permission to delete products because your role don't permitted!")
    }
    
  } catch (error) {
    next(error);
  }
};









