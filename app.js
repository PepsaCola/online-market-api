import express from "express";
import cors from "cors";
import productsRouter from "./routes/productsRouter.js";
import categoriesRouter from "./routes/categoriesRouter.js";
import authRouter from "./routes/authRouter.js";
import reviewsRouter from "./routes/reviewsRouter.js";
import buyRouter from "./routes/buyRouter.js";
import favoriteRouter from "./routes/favoriteRouter.js";
import bucketRouter from "./routes/bucketRouter.js";

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('I am here');
});

app.use('/api/products', productsRouter)
app.use('/api/categories',categoriesRouter)
app.use('/api',authRouter)
app.use('/api/reviews',reviewsRouter)
app.use('/api/buy',buyRouter)
app.use('/api/favorite',favoriteRouter)
app.use('/api/bucket',bucketRouter)

app.use((_,res)=>{

    res.status(404).send('Route not found');
})

app.use((err,req,res,next)=>{
    const {status = 500, message = 'Server error'} = err;
    res.status(status).json({message});
})

export default app;
