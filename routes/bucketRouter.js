import express from "express";
import bucketController from "../controllers/bucketController.js";
import authenticate from "../midlware/authenticate.js";
import checkProductExists from "../midlware/checkProductExists.js";
import checkBucketExists from "../midlware/checkBucketExists.js";
import checkBucketNotExists from "../midlware/checkBucketNotExists.js";

const bucketRouter = express.Router();

bucketRouter.post('/:id',authenticate,checkProductExists,bucketController.postBucket)
bucketRouter.put('/:id',authenticate,checkProductExists,checkBucketNotExists,bucketController.deleteBucket)

export default bucketRouter;