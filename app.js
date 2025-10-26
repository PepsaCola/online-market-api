import express from "express";
import cors from "cors";
import Product from "./models/Product.js";
import Category from "./models/Category.js";
import productsRouter from "./routes/productsRouter.js";
import categoriesRouter from "./routes/categoriesRouter.js";
import authRouter from "./routes/authRouter.js";
import reviewsRouter from "./routes/reviewsRouter.js";

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

const arr = {
    data:[]
}

app.post("/seed", async (req, res, next) => {
    try {
        // await Product.deleteMany({});
        // console.log("Previous products cleared.");

        const allCategories = await Category.find({});
        if (allCategories.length === 0) {
            return res.status(404).json({ message: "No categories found in DB. Please seed categories first." });
        }

        const categoryMap = allCategories.reduce((map, category) => {
            map[category.name] = category._id;
            return map;
        }, {});
        console.log("Category map created.");

        const productsToInsert = arr.data.map(productData => {
            const categoryId = categoryMap[productData.category];

            if (!categoryId) {
                console.warn(`Category "${productData.category}" not found for product "${productData.title}". Skipping.`);
                return null;
            }

            return {
                ...productData,
                category: categoryId,
            };
        }).filter(Boolean);

        await Product.insertMany(productsToInsert);

        console.log(`${productsToInsert.length} products have been successfully seeded.`);
        res.status(201).json({
            message: "Products seeded successfully!",
            count: productsToInsert.length,
        });

    } catch (err) {
        next(err);
    }
});
app.use((_,res)=>{

    res.status(404).send('Route not found');
})

app.use((err,req,res,next)=>{
    const {status = 500, message = 'Server error'} = err;
    res.status(status).json({message});
})

export default app;
