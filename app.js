import { productData } from './api.js';
import { ProductArray } from './product-array.js';
import { findById } from './utils/utils.js';

const productImageTags = document.querySelectorAll('img');
const productRadioTags = document.querySelectorAll('input');
const product = new ProductArray(productData);
const results = document.getElementById('research-results');
const userPicksArray = [];
const trackedViewsArray = [];

function trackUserPicks(productId) {
    let found = findById(userPicksArray, productId);
    if (!found) {
        found = {
            id: productId,
            timesClicked: 1,
        };
        userPicksArray.push(found);
    } else {
        found.timesClicked++;
    }
    const json = JSON.stringify(userPicksArray);
    localStorage.setItem('userPicksArray', json);
}

function incrementShown(productId) {
    let tracked = findById(trackedViewsArray, productId);
    if (!tracked) {
        tracked = {
            id:productId,
            timesShown: 1,
        };
        trackedViewsArray.push(tracked);
    } else {
        tracked.timesShown++;
    }
    const json = JSON.stringify(trackedViewsArray);
    localStorage.setItem('trackedViewsArray', json);
}

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
            incrementShown(randomProductOne.id);
        } else if (i === 0) {
            imageTag.src = randomProductTwo.image; 
            incrementShown(randomProductTwo.id);
        } else {
            imageTag.src = randomProductThree.image;
            incrementShown(randomProductThree.id);
        }
    });
    
    productRadioTags.forEach((radioTag, i) => {
        if (i === 1) {
            radioTag.value = randomProductOne.id;
        } else if (i === 0) {
            radioTag.value = randomProductTwo.id;
        } else { 
            radioTag.value = randomProductThree.id;
        }
    });
};
initializeNewSetOfProducts();
let votesRemaining = 25;

function displayResults() {
    document.getElementById('choices').remove();
    const displayEndPicks = localStorage.getItem('userPicksArray');
    results.innerText = JSON.stringify(displayEndPicks);
}

productRadioTags.forEach((radioTag) => {
    radioTag.addEventListener('click', (event) => {
        if (votesRemaining === 0) return; 
        if (event.target) {
            trackUserPicks(event.target.value);
            votesRemaining--;
            if (votesRemaining === 0) {
                displayResults();
            }
        }
        initializeNewSetOfProducts();
    });
});