import HttpError from "../helpers/HttpError.js";

const checkBucketExists = (req, res, next) => {
    const { user, product } = req;

    const isInBucket = user.bucketProducts.some(
        (fav) => fav.item && fav.item._id.toString() === product._id.toString()
    );

    if (isInBucket) {
        return next(HttpError(400, "Product already in bucket"));
    }

    next();
};

export default checkBucketExists;