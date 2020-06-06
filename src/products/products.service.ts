import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from './product.model';
@Injectable()
export class ProductsService {
    private products: Product[] = [];

    //inset product
    insertProduct(title: string, description: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, description, price);
        this.products.push(newProduct);
        return prodId;
    }

    //get products
    getProducts() {
        return [...this.products]
    }

    //get single product
    getSingleProduct(prodId: string) {
        const product = this.findProduct(prodId)[0];
        return { ...product };
    }

    //update a product
    updateProduct(prodId: string, title: string, description: string, price: number) {
        const [product, index] = this.findProduct(prodId);
        const updatedProduct = { ...product };
        if (title) {
            updatedProduct.title = title;
        }
        if (description) {
            updatedProduct.description = description;
        }
        if (price) {
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;

    }

    //delete product
    deleteProduct(prodId: string) {
        const index = this.findProduct(prodId)[1];
        this.products.splice(index, 1);
    }

    //find product
    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex(prod => prod.id === id);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('Could not found product!');
        }
        return [product, productIndex];
    }

}