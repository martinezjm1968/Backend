const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    // Utilizo un método para llamar a los diferentes métodos que dan de alta un producto
    addProduct(product) {
        const products = this.getProducts();
        product.id = this.generateId(products);
        products.push(product);
        this.saveProducts(products);
        return product.id;
    }

    // Recupero los productos que tengo en el archivo en formato JSON y los parseo a un String
    getProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            // Si el archivo no existe o está vacío, retorna un arreglo vacío
            return [];
        }
    }

    // Recupero un producto en base a su ID
    getProductById(id) {
        const products = this.getProducts();
        return products.find(product => product.id === id);
    }

    // Actualizo un producto en base al ID
    updateProduct(id, updatedFields) {
        const products = this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            const updatedProduct = { ...products[index], ...updatedFields };
            products[index] = updatedProduct;
            this.saveProducts(products);
            return true;
        }

        return false;
    }

    // Borro el producto por ID
    deleteProduct(id) {
        const products = this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            products.splice(index, 1);
            this.saveProducts(products);
            return true;
        }

        return false;
    }

    // Guardo los productos en formato JSON
    saveProducts(products) {
        const data = JSON.stringify(products, null, 2);
        fs.writeFileSync(this.path, data);
    }

    // Genero el ID en base al objeto.length
    generateId(products) {
        if (products.length === 0) {
            return 1;
        }
        const maxId = Math.max(...products.map(product => product.id));
        return maxId + 1;
    }
}

module.exports = ProductManager;
