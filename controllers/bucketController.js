import ctrlWrapper from "../decorators/ctrlWrapper.js";

const postBucket = async (req, res) => {
    const {user,product} = req;

    user.bucketProducts.push({
        item: product._id,
        addedAt: new Date(),
    });

    await user.save();

    res.status(200).json({
        message: "Product successfully saved",
        item:product
    })
}

const deleteBucket = async (req, res) => {
    const {user,product} = req;

    user.bucketProducts = user.bucketProducts.filter(
        (bp) => bp.item._id.toString() !== product._id.toString()
    );

    await user.save();

    res.status(200).json({
        message: "Bucket successfully deleted",
        item:product
    })
}

export default {
    postBucket:ctrlWrapper(postBucket),
    deleteBucket:ctrlWrapper(deleteBucket),
}