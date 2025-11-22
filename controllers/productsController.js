import ctrlWrapper from "../decorators/ctrlWrapper.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import "../models/Review.js";

const getProducts = async (req, res) => {
    const { title, category:categorySlug, page = 1, limit = 20 } = req.query;
    console.log(req.query)
    const filter = {};
    const skip = (page - 1) * limit;

    if (title) {
        filter.title = { $regex: title, $options: "i" };
    }

    if (categorySlug) {
        const category = await Category.findOne({ slug: categorySlug });
        if (category) {
            filter.category = category._id;
        } else {
            return res.status(200).json({ data: [], totalCount: 0 });
        }
    }
    console.log(filter)
    console.log(categorySlug)
    const data = await Product.find(filter)
        .populate("category")
        .populate("reviews")
        .skip(skip)
        .limit(parseInt(limit));

    const totalCount = await Product.countDocuments(filter);

    res.status(200).json({ data, totalCount });
}

export default {
    getProducts: ctrlWrapper(getProducts),
}