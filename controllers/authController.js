import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const postUser = async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        username,
        password:hashedPassword,
        email,
        bucketProducts:[],
        savedProducts:[],
        ordersHistory:[],
        reviews:[],
    }
    const result = await User.create(newUser);
    res.status(201).json({result})
}

const login = async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email})
        .populate('bucketProducts.item')
        .populate('savedProducts.item')
        .populate("reviews")
        .populate("ordersHistory")
    const payload = {id:user._id}
    const token = jwt.sign(payload, process.env.SECRET_KEY,{expiresIn: '2h'})
    res.json({accessToken:token,user})
}

const getUser = async (req, res) => {
    const user = req.user;

    const cleanUser = user.toObject();
    cleanUser.savedProducts = cleanUser.savedProducts
        .filter(entry => entry.item)
        .map(entry => entry.item);

    res.json({ user: cleanUser });
}

export default {
    postUser:ctrlWrapper(postUser),
    login:ctrlWrapper(login),
    getUser:ctrlWrapper(getUser),
}