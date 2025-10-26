import HttpError from "../helpers/HttpError.js";
import Product from "../models/Product.js";

const deleteCheckProductExists = async (req, res, next) => {
    const product = await Product.findById(req.review.product);

    if (!product) {
        return next(HttpError(404, "Product not found"));
    }

    req.product = product;
    next();
};
export default deleteCheckProductExists;