import dotenv from "dotenv";
import app from "./app.js";
// import http from "node:http";
import mongoose from "mongoose";

dotenv.config();
// const PORT = 3001;
// const server = http.createServer(app);

const{NAME,PASS,LINK,DBNAME}=process.env;
mongoose.connect(`mongodb+srv://${NAME}:${PASS}@${LINK}/${DBNAME}?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        // server.listen(PORT,()=>{
        //     console.log(`Server started on port ${PORT}`);
        // })
        console.log('MongoDB Connected')
    })
    .catch((error) => {
        console.log(error);
        process.exit(1);
    })
module.exports = app