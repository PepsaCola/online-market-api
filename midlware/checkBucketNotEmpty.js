import HttpError from "../helpers/HttpError.js";

const checkBucketNotEmpty = (req, res, next) => {
    const user = req.user;

    if (!user.bucketProducts || user.bucketProducts.length === 0) {
        return next(HttpError(400, "Bucket is empty"));
    }

    next();
};

export default checkBucketNotEmpty;
