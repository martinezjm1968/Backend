import {productsModel} from "../../models/products.model.js";

export class ProductsMongo{
    constructor(){
        this.model = productsModel;
    };

    //obtener todos los productos
    async getProducts(){
        try{
            const products = await this.model.find();
            return products;
        }catch(error){
            console.log(error.message);
            // throw error
            throw new Error("Hubo un error al obtener los productos");
        }
    };


    //obtener producto por ID
    async getProductsByID(id){
        try{
            const product = await this.model.findById(id);
            return product;
        }catch(error){
            console.log(error.message);
            // throw error
            throw new Error("Hubo un error al obtener los productos");
        }
    };

    //guardando el producto
    async addProduct(productInfo){
        try{
            const productCreated = await this.model.create(productInfo)
            return productCreated;
        }catch(error){
            console.log(error.message);
            // throw error
            throw new Error("Hubo un error al crear el producto");
        }
    };
}