import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authenticate = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return next(HttpError(401, 'Authorization header is missing'));
    }
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer' || !token) {
        return next(HttpError(401, 'Invalid authorization format'));
    }
    try{
        const {id} = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(id)
            .select("-password")
            .populate('bucketProducts.item')
            .populate('savedProducts.item')
            .populate("reviews");

        if (!user ) {
            return  HttpError(401);
        }
        req.user = user;
        next()
    }catch(err){
        throw HttpError(401,err.message);
    }
}

export default authenticate;