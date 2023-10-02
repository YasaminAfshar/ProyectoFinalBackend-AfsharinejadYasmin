
import ProductsDaoMongo from "../../persistence/daos/mongodb/products.dao.js";
import {expect} from "chai";
import mongoose from "mongoose";
import { logger } from "../../utils/logger.js";
import dbTest from "../../db/db.products.js";

describe("Test unitario de Product Dao", () => {
    let productsDao;
    
    const newProd = {
      title: "Nuevo producto 1",
      description: "Este es el nuevo producto agregado numero 1",
      price: 200,
      code: "AAA003",
      category: "producto",
      stock: 23,
      thumbnails: "Sin imagenes",
      status: true,
    };

    const updateProd= {
      title: "Nuevo producto actualizado",
      description: "Este es el producto numero 1 actualizado",
      price: 500,
      code: "AAA003",
      category: "producto",
      stock: 13,
      thumbnails: "Sin imagenes",
      status: true,
    };

    const deleteProd = {
      title: "Nuevo producto a eliminar",
      description: "Este es el producto que se va a eliminar",
      price: 500,
      code: "AAA003",
      category: "producto",
      stock: 13,
      thumbnails: "Sin imagenes",
      status: true,
    };

    before(async () => {
        await dbTest();
        productsDao = new ProductsDaoMongo();
    });

    afterEach(async () => {
      await mongoose.connection.collections["products"].deleteMany({});
    });

    after(async () => {
      await mongoose.connection.close();
      logger.info("Finalizaron las pruebas unitarias realizadas en el Product Dao!");
    });

    it("Tiene que retornar un array vacío ya que no se agregó ningún producto", async () => {
      const docs = await productsDao.getProducts();
      //expect(Array.isArray(docs)).to.be.equal(true);
      expect(docs).to.be.a("object"); //no se si esta es la forma correcta por como se plantea utilizando paginate
      expect(docs.docs).to.have.length(0);
    }).timeout(5000);

    it("Tiene que crear y agregar un producto a la colección", async () => {
      const createdProduct = await productsDao.addProduct(newProd);
      const collection = await productsDao.getProducts();
      expect(createdProduct).to.exist;
      expect(createdProduct).to.have.property("_id");
      expect(createdProduct.title).to.equal(newProd.title);
      expect(createdProduct.code).to.equal(newProd.code);
      expect(newProd.description).to.be.a("string");
      expect(newProd.category).to.be.a("string");
      expect(newProd.stock).to.be.a("number");
      expect(newProd.price).to.be.a("number");
      expect(collection.docs).to.have.length(1);
    }).timeout(5000);

    it("Tiene que retornar un array con el producto que se agregó", async () => {
      const createdProduct = await productsDao.addProduct(newProd);
      expect(createdProduct).to.exist;
      const docs = await productsDao.getProducts();
      expect(docs).to.be.a("object");
      expect(docs.docs).to.have.length(1);
      const addedProduct = docs.docs[0];
      expect(addedProduct.title).to.equal(newProd.title);
      expect(addedProduct.description).to.equal(newProd.description);
      expect(addedProduct.price).to.equal(newProd.price);
      expect(addedProduct.code).to.equal(newProd.code);
      expect(addedProduct.category).to.equal(newProd.category);
      expect(addedProduct.stock).to.equal(newProd.stock);
      expect(addedProduct.thumbnails).to.equal(newProd.thumbnails);
    }).timeout(5000);

    it("Tiene que encontrar en la colección el producto que le indiquemos por ID", async () => {
      const createdProduct = await productsDao.addProduct(newProd);
      const searchId = await productsDao.getProductById(createdProduct._id);
      expect(searchId).to.not.be.null;
      const toString = createdProduct._id.toString();
      expect(searchId._id.toString()).to.equal(toString);
    }).timeout(5000);

    it("Tiene que actualizar el producto que se agrega a la colección", async () => {
      const createdProduct = await productsDao.addProduct(newProd);
      const searchId = await productsDao.getProductById(createdProduct._id);
      expect(searchId).to.not.be.null;
      const updateDoc = await productsDao.updateProduct(searchId, updateProd);
      expect(updateDoc.title).to.be.equal(updateProd.title);
      expect(updateDoc.description).to.be.equal(updateProd.description);
      expect(updateDoc.price).to.be.equal(updateProd.price);
      expect(updateDoc.stock).to.be.equal(updateProd.stock);
      expect(updateDoc.category).to.be.equal(updateProd.category);
      expect(updateDoc.code).to.be.equal(updateProd.code);
      expect(updateDoc.status).to.be.equal(updateProd.status);
    }).timeout(5000);

    it("Tiene que eliminar el producto que se elige por ID", async () => {
      const createdProduct = await productsDao.addProduct(deleteProd);
      expect(createdProduct).to.exist;
      const deleteDoc = await productsDao.deleteProduct(createdProduct._id);
      expect(deleteDoc._id.toString()).to.equal(createdProduct._id.toString());
      expect(deleteDoc.title).to.be.equal(deleteProd.title);
      expect(deleteDoc.price).to.be.equal(deleteProd.price);
      expect(deleteDoc.code).to.be.equal(deleteProd.code);
    }).timeout(5000);

});