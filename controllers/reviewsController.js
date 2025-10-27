import ctrlWrapper from "../decorators/ctrlWrapper.js";
import Review from "../models/Review.js";
import HttpError from "../helpers/HttpError.js";

const postReview = async (req, res) => {
    const { product, rate, text } = req.body;

    const review = await Review.create({
        user: req.user._id,
        product,
        rate,
        text,
    });
    req.user.reviews.push(review._id)
    req.product.reviews.push(review._id);

    await req.user.save()
    await req.product.save()

    res.status(201).json({
        message: "Review successfully created",
        review,
    })
}

const putReview = async (req, res) => {
    const review = req.review;
    const { rate, text } = req.body;

    if (review.user.toString() !== req.user._id.toString()) {
        throw HttpError(403, "You are not allowed to edit this review");
    }

    review.rate = rate ?? review.rate;
    review.text = text ?? review.text;
    review.addedAt = new Date();

    await review.save();

    res.status(200).json({
        message: "Review successfully updated",
        review,
    });
}

const deleteReview = async (req, res) => {
    const { review, user,product } = req;

    if (review.user.toString() !== user._id.toString()) {
        throw HttpError(403, "You are not allowed to delete this review");
    }

    await Review.findByIdAndDelete(review._id);

    await Promise.all([
        user.updateOne({ $pull: { reviews: review._id } }),
        product.updateOne({ $pull: { reviews: review._id } }),
    ]);

    res.status(200).json({ message: "Review successfully deleted" });
};

export default {
    postReview:ctrlWrapper(postReview),
    putReview:ctrlWrapper(putReview),
    deleteReview:ctrlWrapper(deleteReview),
}