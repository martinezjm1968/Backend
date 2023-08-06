import mongoose from "mongoose";

// Nombre coleccion productos
const productsCollection = "products";

// esquema de productos
const productsSchema = new mongoose.Schema({
    "name":{type:String, required:true},
    "price":{type:Number, required:true},
    "code":{type:String, required:true},
    "category":{type:String, required:true, enum:["Ropa","Deportes","Cosmetica"]},
    "stock":{type:Number, required:true}
});

export const productsModel = mongoose.model(productsCollection,productsSchema);