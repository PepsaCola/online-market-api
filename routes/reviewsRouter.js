import express from "express";
import reviewsController from "../controllers/reviewsController.js";
import validateBody from "../midlware/validateBody.js";
import authenticate from "../midlware/authenticate.js";
import {reviewSchema, reviewUpdateSchema} from "../schemas/reviewSchema.js";
import checkReviewExists from "../midlware/checkReviewExists.js";
import checkProductExists from "../midlware/checkProductExists.js";
import deleteCheckProductExists from "../midlware/deleteCheckProductsExists.js";

const reviewsRouter =express.Router();

reviewsRouter.post('/',authenticate,checkProductExists ,validateBody(reviewSchema),reviewsController.postReview)
reviewsRouter.put('/:id',authenticate,checkReviewExists ,validateBody(reviewUpdateSchema),reviewsController.putReview)
reviewsRouter.delete('/:id',authenticate,checkReviewExists,deleteCheckProductExists,reviewsController.deleteReview)

export default reviewsRouter;