import ctrlWrapper from "../decorators/ctrlWrapper.js";
import Category from "../models/Category.js";

const getAllCategories = async (req, res) => {
    const data = await Category.find()
    res.status(200).json(data)
}

export default {
    getAllCategories: ctrlWrapper(getAllCategories),
}