import express from "express";
import favoriteController from "../controllers/favoriteController.js";
import checkProductExists from "../midlware/checkProductExists.js";
import authenticate from "../midlware/authenticate.js";
import checkFavoriteExists from "../midlware/checkFavoriteExists.js";
import checkFavoriteNotExists from "../midlware/checkFavoriteNotExists.js";

const favoriteRouter = express.Router();

favoriteRouter.post('/:id',authenticate,checkProductExists,checkFavoriteExists,favoriteController.postFavorite)
favoriteRouter.delete('/:id',authenticate,checkProductExists,checkFavoriteNotExists,favoriteController.deleteFavorite)

export default favoriteRouter;