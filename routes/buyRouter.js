import express from "express";
import buyController from "../controllers/buyController.js";
import authenticate from "../midlware/authenticate.js";
import checkBucketNotEmpty from "../midlware/checkBucketNotEmpty.js";
import checkProductInBucket from "../midlware/checkProductInBucket.js";

const buyRouter = express.Router();

buyRouter.put('/all',authenticate,checkBucketNotEmpty, buyController.buyAll)
buyRouter.put('/:id',authenticate,checkProductInBucket, buyController.buyOne)

export default buyRouter;