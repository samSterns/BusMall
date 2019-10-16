import { productData } from './api.js';
import { ProductArray } from './product-array.js';

const productImageTags = document.querySelectorAll('img');
const productRadioTags = document.querySelectorAll('input');
// const productName = document.getElementById('product-name');
const product = new ProductArray(productData);
// const radioButton = document.getElementById('radio-button');

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

    const clickedArray = [];
    productRadioTags.forEach((radioTag, i) => {

        if (i === 1) {
            radioTag.value = randomProductOne.id;
        } else if (i === 0) {
            radioTag.value = randomProductTwo.id;
        } else {
            radioTag.value = randomProductThree.id;
        }
        radioTag.addEventListener('click', (event) => {
            let found = false; 
            clickedArray.forEach(clickedItem => {
                if (clickedItem.id === radioTag.value) {
                    found = true;
                    clickedItem.clicks += 1;
                }
            });
            if (!found) {
                clickedArray.push({
                    id: radioTag.value, clicks: 1
                });
            }
            console.log(clickedArray);
         });
    });
};

initializeNewSetOfProducts();

// const clickedAndShown = [];

// abstact to a function // 
// //to disable button
// // if (totalProductsClicked <= 25) {
// //     radioButton.disabled = true;
// //     window.location = '../research-results';
// // }
