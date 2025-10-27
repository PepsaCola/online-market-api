import ctrlWrapper from "../decorators/ctrlWrapper.js";

const buyAll = async (req, res) => {
    const user = req.user;

    const productIds = user.bucketProducts.map((bp) => bp.item);

    user.ordersHistory.push({
        items: productIds,
        addedAt: new Date(),
    });

    user.bucketProducts = [];

    await user.save();

    res.status(200).json({
        message: "Order successfully created",
        order: {
            items: productIds,
            addedAt: new Date(),
        },
    });
}

const buyOne = async (req, res) => {
    const user = req.user;
    const productId = req.product;

    user.ordersHistory.push({
        items: [productId],
        addedAt: new Date(),
    })

    user.bucketProducts = user.bucketProducts.filter(
        (bp) => bp.item._id.toString() !== productId.toString()
    );

    await user.save();

    res.status(200).json({
        message: "Order successfully created",
        order: {
            items: productId,
            addedAt: new Date(),
        }
    })

}

export default {
    buyAll:ctrlWrapper(buyAll),
    buyOne:ctrlWrapper(buyOne),
}