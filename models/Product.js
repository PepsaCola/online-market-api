import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug:{
        type: String,
        required: true,
        unique: true,
    },
    price:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    images:{
        type: [String],
        required: true,
    },
    reviews:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Review",
    }
})

export default mongoose.model("Product", productSchema)