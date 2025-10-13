import express from "express";
import cors from "cors";
import Product from "./models/Product.js";
import Category from "./models/Category.js";
import productsRouter from "./routes/productsRouter.js";
import categoriesRouter from "./routes/categoriesRouter.js";

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('I am here'); // I also corrected the typo from 'hear' to 'here'
});
app.use('/api/products', productsRouter)
app.use('/api/categories',categoriesRouter)

const arr = {
    data:[]
}



app.post("/seed", async (req, res, next) => {
    try {
        // Крок 1: Очистити існуючі продукти, щоб уникнути дублікатів (опціонально)
        // await Product.deleteMany({});
        // console.log("Previous products cleared.");

        // Крок 2: Отримати всі категорії з бази даних
        const allCategories = await Category.find({});
        if (allCategories.length === 0) {
            return res.status(404).json({ message: "No categories found in DB. Please seed categories first." });
        }

        // Крок 3: Створити мапу для швидкого доступу: { "Electronics": "60c72b...", ... }
        const categoryMap = allCategories.reduce((map, category) => {
            map[category.name] = category._id;
            return map;
        }, {});
        console.log("Category map created.");


        // Крок 4: Підготувати дані продуктів, замінюючи назву категорії на її ID
        const productsToInsert = arr.data.map(productData => {
            const categoryId = categoryMap[productData.category];

            if (!categoryId) {
                console.warn(`Category "${productData.category}" not found for product "${productData.title}". Skipping.`);
                return null; // Пропустити продукт, якщо категорія не знайдена
            }

            return {
                ...productData, // копіюємо всі поля (title, slug, price...)
                category: categoryId, // замінюємо текстову категорію на ObjectId
            };
        }).filter(Boolean); // Видалити всі null значення з масиву

        // Крок 5: Вставити всі підготовлені продукти в базу даних одним запитом
        await Product.insertMany(productsToInsert);

        console.log(`${productsToInsert.length} products have been successfully seeded.`);
        res.status(201).json({
            message: "Products seeded successfully!",
            count: productsToInsert.length,
        });

    } catch (err) {
        // Передати помилку в обробник помилок
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
