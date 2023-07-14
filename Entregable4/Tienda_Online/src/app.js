import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import path from "path";
import {Server} from "socket.io";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";

const port = 8080;
const app = express();

//midlewares
app.use(express.static(path.join(__dirname,"/public")));

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Guardar el servidor http en una variable
const httpsServer = app.listen(port,()=>console.log(`Server is listening on port ${port}`));

//configuracion para utilizar handlebars
app.engine('.hbs', handlebars.engine({extname: '.hbs'}));//inciar el motor de plantillas handlebars
app.set('view engine', '.hbs');//indicar que motor vamos a utilizar
app.set('views', path.join(__dirname,"/views"));//ruta de la carpeta de vistas

// Crear servidor de websocket
const socketServer = new Server(httpsServer);
let messages = [];
// Crear el canal de comunicacion, detectar socket del cliente
socketServer.on("connection", (socketConnected)=>{
    console.log(`Nuevo cliente conectado  ${socketConnected.id}`);
    // Capturar info del cliente
    socketConnected.on("messageKey", (data)=>{
        console.log(data);
        messages.push({userId:socketConnected.id,message:data});

        // Enviar todos los mensajes a todos los clientes
        socketServer.emit("messageHistory", messages);
    });
});

//routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use(viewsRouter);