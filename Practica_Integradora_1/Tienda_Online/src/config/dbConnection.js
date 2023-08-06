import mongoose from "mongoose";
import {config} from "./config.js";

export const connectDB = async()=>{
    try {
        await mongoose.connect(config.mongo.url);
        console.log("BD conectada!");
    } catch (error) {
        console.log(`Error al conectar BD ${error.message}`);
    }
}