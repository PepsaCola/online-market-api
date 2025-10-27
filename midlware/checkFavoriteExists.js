import HttpError from "../helpers/HttpError.js";

const checkFavoriteExists = (req, res, next) => {
    const { user, product } = req;

    const isAlreadyFavorite = user.savedProducts.some(
        (fav) => fav.item._id.toString() === product._id.toString()
    );

    if (isAlreadyFavorite) {
        return next(HttpError(400, "Product already in favorites"));
    }

    next();
};

export default checkFavoriteExists;
