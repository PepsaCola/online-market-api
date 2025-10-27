import HttpError from "../helpers/HttpError.js";

const checkBucketNotExists = (req, res, next) => {
    const { user, product } = req;

    const isInBucket = user.bucketProducts.some(
        (fav) => fav.item && fav.item._id.toString() === product._id.toString()
    );

    if (!isInBucket) {
        return next(HttpError(400, "Product not found in bucket"));
    }

    next();
};

export default checkBucketNotExists;
