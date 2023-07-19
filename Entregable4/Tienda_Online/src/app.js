import express from "express";
import {engine} from "express-handlebars";
import { __dirname } from "./utils.js";
import path from "path";
import {Server} from "socket.io";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { ProductManager } from "./dao/productManager.js";

const port = 8080;
const app = express();

//midlewares
app.use(express.static(path.join(__dirname,"/public")));

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Guardar el servidor http en una variable
const httpsServer = app.listen(port,()=>console.log(`Server esta funcionando en el puerto ${port}`));

//configuracion para utilizar handlebars
//configuracion de handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

// Crear servidor de websocket
const socketServer = new Server(httpsServer);
let messages = [];

//routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use(viewsRouter);
//app.use("/", viewsRouter);
//app.use(`/${BASE_PREFIX}/products`, productsRouter)
//app.use(`/${BASE_PREFIX}/carts`, cartsRouter)

// Crear el canal de comunicacion, detectar socket del cliente
socketServer.on("connection", async (socketConnected)=>{
    console.log(`Nuevo cliente conectado  ${socketConnected.id}`);
    // lista de productos para realtime
    const listProductRealTime = await ProductManager.getProducts;
    
    // enviando lista de productos
    socketConnected.emit('listProductReal',listProductRealTime );

    // escuchando mensaje del addProduct
    socketConnected.on('addProduct', async(product)=>{
        await ProductManager.addProduct(product);
    })

    // escuchando mensaje del deleteProduct
    socketConnected.on('deleteProduct', async(id)=>{
        await ProductManager.deleteProduct(Number(id));
    })
});