import express from "express";
import {config} from "../src/config/config.js";
import { connectDB } from "./config/dbConnection.js";
//import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { ProductsMongo } from "./dao/managers/mongo/productsMongo.js";

const productService = new ProductsMongo();
const port = config.server.port;
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(port,()=>console.log(`Server listening on port ${port}`));
// conexion BD
connectDB();

//routes
app.use("/api/products", ProductsMongo);
app.use("/api/carts", cartsRouter);