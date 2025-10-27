import HttpError from "../helpers/HttpError.js";

const checkProductInBucket = async (req, res, next) => {
    const { id } = req.params;
    const user = req.user;

    if (!id) {
        return next(HttpError(400, "Product ID is required"));
    }

    const isInBucket = user.bucketProducts.some(
        (bp) => bp.item._id.toString() === id.toString()
    );

    if (!isInBucket) {
        return next(HttpError(404, "Product not found in user's bucket"));
    }

    req.product = id

    next();
};

export default checkProductInBucket;
