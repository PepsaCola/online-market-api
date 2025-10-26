import Review from "../models/Review.js";
import HttpError from "../helpers/HttpError.js";

const checkReviewExists = async (req, res, next) => {
    const reviewId = req.params.id;

    if (!reviewId) {
        return next(HttpError(400, "Review ID is required"));
    }

    const review = await Review.findById(reviewId);
    if (!review) {
        return next(HttpError(404, "Review not found"));
    }

    req.review = review;
    next();
};

export default checkReviewExists;
