import HttpError from "../helpers/HttpError.js";

const checkFavoriteNotExists = (req, res, next) => {
    const { user, product } = req;

    const isInFavorites = user.savedProducts.some(
        (fav) => fav.item._id.toString() === product._id.toString()
    );

    if (!isInFavorites) {
        return next(HttpError(400, "Product not found in favorites"));
    }

    next();
};

export default checkFavoriteNotExists;
