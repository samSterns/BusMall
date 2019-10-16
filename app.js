import { productData } from './api.js';
import { ProductArray } from './product-array.js';

const productImageTags = document.querySelectorAll('img');
const productRadioTags = document.querySelectorAll('input');
const productName = document.getElementById('product-name');
const product = new ProductArray(productData);
const radioButton = document.getElementById('radio-button');

console.log(product);

const initializeNewSetOfProducts = () => {
    const randomProductOne = product.getRandomProduct();
    let randomProductTwo = product.getRandomProduct();
    let randomProductThree = product.getRandomProduct();

    while (randomProductOne.id === randomProductTwo.id) {
        randomProductTwo = product.getRandomProduct();
    }

    while (randomProductTwo.id === randomProductThree.id || randomProductOne.id === randomProductThree.id) {
        randomProductThree = product.getRandomProduct();
    }

    productImageTags.forEach((imageTag, i) => {
        if (i === 1) {
            imageTag.src = randomProductOne.image;
        } else if (i === 0) {
            imageTag.src = randomProductTwo.image; 
        } else {
            imageTag.src = randomProductThree.image;
        }
    });

    productRadioTags.forEach((radioTag, i) => {
        if (i === 1) {
            radioButton.value = randomProductOne.id;
        } else if (i === 0) {
            radioButton.value = randomProductTwo.id;
        } else {
            radioButton.value = randomProductThree.id;
        }
    });
};

initializeNewSetOfProducts();




// //to disable button
// // if (totalProductsClicked <= 25) {
// //     radioButton.disabled = true;
// //     window.location = '../research-results';
// // }
// // from veggie lab
// // for (let i = 0; i < product.length; i++) {
// //     const c