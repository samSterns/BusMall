import { productData } from './api.js';
import { ProductArray } from './product-array.js';

const productImageTags = document.querySelectorAll('img');
const productRadioTags = document.querySelectorAll('input');
const productName = document.getElementById('tree-name');
const product = new ProductArray(productData);
const radioButton = document.getElementById('radio-button')

const initializeNewSetOfProducts = () => {
    const randomProduct = product.getRandomProduct();
    let randomProductTwo = product.getRandomProduct();
    let randomProductThree = product.getRandomProduct();

    while (randomProduct.id === randomProductTwo.id) {
        randomProductTwo = product.getRandomProduct();
    }

    while (randomProductTwo.id === randomProductThree.id || randomProduct.id === randomProductThree.id) {
        randomProductThree = product.getRandomProduct();
    }

    productImageTags.forEach((imageTag, i) => {
        if (i === 1) {
            imageTag.src = randomProduct.image;
        } else if (i === 0) {
            imageTag.src = randomProductTwo.image; 
        } else {
            imageTag.src = randomProductThree.image;
        }
    })
}



initializeNewSetOfProducts();
//to disable button
// if (totalProductsClicked <= 25) {
//     radioButton.disabled = true;
//     window.location = '../research-results'
// }
// from veggie lab
// for (let i = 0; i < product.length; i++) {
//     const c