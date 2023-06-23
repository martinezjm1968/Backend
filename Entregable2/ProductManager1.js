const fs = require('fs');

class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        // Validar que todos los campos sean obligatorios y que no sean nulos, salvo Stock que podría ser 0
        if (!title || title == "" || !description || description == "" || !price || price == 0 || !thumbnail || thumbnail == "" || !code || code == "" ) {
            console.error("Todos los campos son obligatorios y no vacíos");
            return;
        }

        // Validar que el campo "code" no se repita
        if (this.products.some((product) => product.code === code)) {
            console.error(`El producto con el código ${code} ya existe`);
            return;
        }

        // Crear el nuevo producto con un id autoincrementable
        const newProduct = {
            id: this.nextId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        this.products.push(newProduct);
        this.nextId++;

        console.log("Producto agregado:", newProduct);

        const products = this.getProducts();
        newProduct.id = this.generateId(products);
        products.push(newProduct);
        this.saveProducts(products);
        return newProduct.id;
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

// Ejemplo de uso
const manager = new ProductManager();

manager.addProduct("Producto 1", "Descripción 1", 10.99, "imagen1.jpg", "001", 100);
manager.addProduct("Producto 2", "Descripción 2", 19.99, "imagen2.jpg", "002", 50);
manager.addProduct("Producto 3", "Descripción 3", 39.99, "imagen3.jpg", "003", 40);

// Llamo a getProducts antes de cargar un producto y me da vacío
const products = manager.getProducts();
console.log('Todos los productos:', products);

// Obtener todos los productos
const allProducts = manager.getProducts();
console.log('Todos los productos:', allProducts);

// Obtener un producto por ID
const productById = manager.getProductById(1);
console.log('Producto por ID:', productById);

// Actualizar un producto
const updatedFields = { price: 12, stock: 60 };
const isUpdated = manager.updateProduct(2, updatedFields);
console.log('Producto actualizado:', isUpdated);

// Eliminar un producto
const isDeleted = manager.deleteProduct(2);
console.log('Producto eliminado:', isDeleted);

// Obtener todos los productos
const allProducts1 = manager.getProducts();
console.log('Todos los productos:', allProducts1);