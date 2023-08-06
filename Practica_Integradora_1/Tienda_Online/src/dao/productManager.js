import { __dirname } from "../../src/utils.js";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

export class ProductManager {
    constructor(fileName) {
        this.path = path.join(__dirname, `/files/${fileName}`); //src/files/products.json
        this.products = [];
        this.loadProducts();
    }

    fileExists() {
        return fs.existsSync(this.path);
    }


    async loadProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8');
            if (data) {
                this.products = JSON.parse(data);
            } else {
                throw new Error("No es posible obtener los productos!");
            }
            console.log("loadProducts: ", this.products);
            return this.products;
        } catch (error) {
            console.error('Error loading products:', error);
            return [];
            throw new Error("Error en la carga de productos")
        }
    }

    generateId() {
        let newId = uuidv4();
        return newId
        /*
        return this.products.length > 0
            // ? Math.max(...this.products.map((product) => product.id)) + 1
            : 1;
        */
    }

    async saveProducts() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error('Error saving products:', error);
            throw new Error("Error al querer guardar el/los producto/s!")
        }
    }

    addProduct(product) {
        try {
            if (!product.title || product.title == "" || !product.description || product.description == "" || !product.price || product.price == 0 || !product.code || product.code == "" || !product.stock || !product.status || product.category == "" || !product.category) {
                console.error('All fields are required');
                return;
            }

            const existingProduct = this.products.find((p) => p.code === product.code);
            if (existingProduct) {
                console.error('Product with the same code already exists');
                return;
            }

            const newProduct = {
                id: this.generateId(),
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock,
                status: product.status,
                category: product.category
            };

            this.products.push(newProduct);
            this.saveProducts();
            return newProduct;

        } catch (error) {
            throw new Error("Error al querer dar de alta el producto!")
        }

    }

    getProducts() {
        try {
            return this.products;
        } catch (error) {
            throw new Error("Error al querer listar los productos!")
        }

    }

    getProductById(id) {
        try {
            const product = this.products.find((p) => p.id === id);
            if (!product) {
                console.error('Not found');
                return;
            }
            return product;
        } catch (error) {
            throw new Error("Error al querer listar el producto!")
        }

    }

    async updateProduct(id, updatedFields) {
        try {
            const productIndex = this.products.findIndex((p) => p.id === id);
            if (productIndex === -1) {
                console.error('Not found');
                return;
            } else {
                console.log("Producto para update encontrado!");
            }

            const updatedProduct = { ...this.products[productIndex], ...updatedFields };
            this.products[productIndex] = updatedProduct;
            this.saveProducts();
        } catch (error) {
            throw new Error("Error al querer actualizar el producto!")
        }

    }

    async deleteProduct(id) {
        try {
            const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex === -1) {
            console.error('Not found');
            return;
        }

        this.products.splice(productIndex, 1);
        this.saveProducts();
        } catch (error) {
            throw new Error("Error al querer borrar el producto!")
        }
        
    }
}
