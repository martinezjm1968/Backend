import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import path from "path";
import { viewsRouter } from "./routes/views.routes.js";
import {Server} from "socket.io";

import { viewsRouter } from "./routes/views.routes.js";
//import { usersRouter } from "./routes/users.routes.js";

const port = 8080;
const app = express();

//midlewares
app.use(express.static(path.join(__dirname,"/public")));
//app.use(express.urlencoded({extended:true}));

// Guardar el servidor http en una variable
const httpsServer = app.listen(port,()=>console.log(`Server is listening on port ${port}`));

//configuracion para utilizar handlebars
app.engine('.hbs', handlebars.engine({extname: '.hbs'}));//inciar el motor de plantillas handlebars
app.set('view engine', '.hbs');//indicar que motor vamos a utilizar
app.set('views', path.join(__dirname,"/views"));//ruta de la carpeta de vistas

app.use(express.static(__dirname+'/public'));
app.use('/', viewsRouter);

// Crear servidor de websocket
const socketServer = new Server(httpsServer);
let messages = [];
// Crear el canal de comunicacion, detectar socket del cliente
socketServer.on("connection", (socketConnected)=>{
    console.log(`Nuevo cliente conectado  ${socketConnected.id}`);
    // Recibir eventos del socket del cliente conectado
    // El nombre del evento (messageEvent) debe ser el mismo en cliente y servidor
    //socketConnected.on("messageEvent", (data)=>{
    //  console.log(`Datos recibidos del cliente: ${data}`);
    //});

    // Enviar datos del socket del servidor al socket del cliente
    /*
    setTimeout(()=>{
        socketConnected.emit("eventoIndividual", "Mensaje solo para el cliente actual!")
        socketConnected.emit("eventoIndividual", `Bienvenido: ${socketConnected.id}`)
        // Enviar datos a todos los clientes conectados, menos al cliente actual
        socketConnected.broadcast.emit("eventoTodosMenosActual", "Mensaje para todos los clientes menos el actual");

        // Enviar datos a todos los clientes
        socketServer.emit("eventoParaTodos", "Nueva Promocion!")
    },4000);
    */

    // Capturar info del cliente
    socketConnected.on("messageKey", (data)=>{
        console.log(data);
        messages.push({userId:socketConnected.id,message:data});

        // Enviar todos los mensajes a todos los clientes
        socketServer.emit("messageHistory", messages);
    });
});

//routes
app.use(viewsRouter);
//app.use("/api/users", usersRouter);