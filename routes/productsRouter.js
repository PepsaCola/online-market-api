import express from "express";
import productsController from "../controllers/productsController.js";

const productsRouter = express.Router();

productsRouter.get('/', productsController.getAllProducts);

export default productsRouter;