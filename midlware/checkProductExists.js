import HttpError from "../helpers/HttpError.js";
import Product from "../models/Product.js";

const checkProductExists = async (req, res, next) => {
    const productId = req.body.product

    if (!productId) {
        return next(HttpError(400, "Product ID is required"));
    }

    const product = await Product.findById(productId);
    if (!product) {
        return next(HttpError(404, "Product not found"));
    }

    req.product = product;
    next();
};
export default checkProductExists;