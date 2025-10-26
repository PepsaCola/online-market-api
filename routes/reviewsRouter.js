import express from "express";
import reviewsController from "../controllers/reviewsController.js";
import validateBody from "../midlware/validateBody.js";
import authenticate from "../midlware/authenticate.js";
import {reviewSchema, reviewUpdateSchema} from "../schemas/reviewSchema.js";
import checkReviewExists from "../midlware/checkReviewExists.js";

const reviewsRouter =express.Router();

reviewsRouter.post('/',authenticate ,validateBody(reviewSchema),reviewsController.postReview)
reviewsRouter.put('/:id',authenticate,checkReviewExists ,validateBody(reviewUpdateSchema),reviewsController.putReview)
reviewsRouter.delete('/:id',authenticate,checkReviewExists ,reviewsController.deleteReview)

export default reviewsRouter;