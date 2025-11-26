import ctrlWrapper from "../decorators/ctrlWrapper.js";

const postBucket = async (req, res) => {
    const { user, product } = req;
    console.log(product);
    const existingItem = user.bucketProducts.find(
        (bp) => bp.item._id.toString() === product._id.toString()
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {

        user.bucketProducts.push({
            item: product._id,
            quantity: 1,
            addedAt: new Date(),
        });
    }

    await user.save();
    await user.populate('bucketProducts.item');

    res.status(200).json({
        message: existingItem
            ? "Product quantity increased"
            : "Product successfully saved",
        bucketProducts: user.bucketProducts,
        item: product
    });
}

const deleteBucket = async (req, res) => {
    const { user, product } = req;
    const existingItem = user.bucketProducts.find(
        (bp) => {
            console.log(bp.item);
             return  bp.item._id.toString() === product._id.toString()
        }
    );

    let message = "Item quantity decreased";

    if (existingItem) {
        if (existingItem.quantity > 1) {
            existingItem.quantity -= 1;
        } else {
            user.bucketProducts = user.bucketProducts.filter(
                (bp) => bp.item._id.toString() !== product._id.toString()
            );
            message = "Product successfully removed from bucket";
        }
    } else {
        return res.status(404).json({ message: "Product not found in bucket" });
    }

    await user.save();
    await user.populate('bucketProducts.item');

    res.status(200).json({
        message,
        bucketProducts: user.bucketProducts,
        item: product
    });
}
export default {
    postBucket:ctrlWrapper(postBucket),
    deleteBucket:ctrlWrapper(deleteBucket),
}