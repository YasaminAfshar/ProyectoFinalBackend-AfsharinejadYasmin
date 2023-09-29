

import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const mockProductsCollection = "mock_products";

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 250 },
  description: { type: String, required: true, maxLength: 500, default: "Description not provided" },
  price: { type: Number, required: true },
  code: { type: String, required: true, unique: true},
  category: { type: String, required: true, default: "other" },
  stock: { type: Number, required: true, max: 100 },
  thumbnails: { type: String, required: true },
  status: { type: Boolean, default: true },
});

productsSchema.plugin(mongoosePaginate);

export const mockProductsModel = mongoose.model(mockProductsCollection, productsSchema);