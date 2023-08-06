import mongoose from "mongoose";

// Nombre coleccion productos
const chatCollection = "chatMessages";

// esquema de productos
const messageSchema = new mongoose.Schema({
    "user":{type:String, required:true},
    "message":{type:String, required:true}
    
});

export const chatModel = mongoose.model(chatCollection,messageSchema);