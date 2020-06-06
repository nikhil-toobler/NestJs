import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from './products.service';


@Controller('products')
export class ProductsController {
    constructor(private readonly ProductsService: ProductsService) { }

    //post new product
    @Post()
    addProduct(
        @Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number,
    ) {
        const generatedId = this.ProductsService.insertProduct(prodTitle, prodDesc, prodPrice);
        return { id: generatedId };
    }

    //get all products
    @Get()
    getAllProducts() {
        return this.ProductsService.getProducts()
    }

    //get a single product
    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.ProductsService.getSingleProduct(prodId);
    }

    //update existing product
    @Patch(':id')
    updateProduct(@Param('id') prodId: string, @Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number) {
        this.ProductsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }

    //delete product
    @Delete(':id')
    deleteProduct(@Param('id') prodId: string) {
        this.ProductsService.deleteProduct(prodId);
        return null;
    }

}