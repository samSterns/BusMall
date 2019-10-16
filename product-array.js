import { getRandomInt } from './utils/utils.js';

export class ProductArray {
    constructor(product) {
        this.product = product.slice();
    }

    getProduct() {
        return this.product;
    }

    removeProductById(someId) {
        this.product.forEach(product =>{
            if (someId === product.id) {
                this.product.spilce(someId, 1);
            }
        });
    }

    getProductById(someId) {
        let productSelection;

        this.product.forEach(product => {
            if (someId === product.id) {
                productSelection = product;
            }
        });

        return productSelection;
    }

    hasAnyProduct() {
        return this.product.length;
    }

    getRandomProduct() {
        const randomProductIndex = getRandomInt();
        return this.product[randomProductIndex];
    }
}