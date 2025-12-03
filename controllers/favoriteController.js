import ctrlWrapper from "../decorators/ctrlWrapper.js";

const postFavorite = async (req, res) => {
    const {user,product} = req;

    user.savedProducts.push({
        item: product.id,
        addedAt: new Date(),
    });

    await user.save();

    res.status(200).json({
        message: "Product successfully saved",
        item:product
    })
}

const deleteFavorite = async (req, res) => {
    const {user,product} = req;

    user.savedProducts = user.savedProducts.filter(
        (bp) => bp.item._id.toString() !== product._id.toString()
    );

    await user.save();

    res.status(200).json({
        message: "Favorite successfully deleted",
        itemId:product._id
    })
}

export default {
    postFavorite: ctrlWrapper(postFavorite),
    deleteFavorite: ctrlWrapper(deleteFavorite),
}