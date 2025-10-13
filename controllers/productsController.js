import ctrlWrapper from "../decorators/ctrlWrapper.js";
import Product from "../models/Product.js";

const getAllProducts = async (req, res) => {
    const data = await Product.find().populate("category")
    res.status(200).json(data)
}

export default {
    getAllProducts: ctrlWrapper(getAllProducts),
}