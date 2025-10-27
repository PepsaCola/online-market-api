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
        itemId:product
    })
}

const deleteFavorite = async (req, res) => {
    const {user,product} = req;

    user.savedProducts = user.savedProducts.filter(
        (bp) => bp.item.toString() !== product.toString()
    );

    await user.save();

    res.status(200).json({
        message: "Favorite successfully deleted",
        itemId:product
    })
}

export default {
    postFavorite: ctrlWrapper(postFavorite),
    deleteFavorite: ctrlWrapper(deleteFavorite),
}