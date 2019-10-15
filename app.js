import { productData } from './api.js';
import { productArray } from './product-array.js';

const productImageTags = document.querySelectorAll('img');
const productRadioTags = document.querySelectorAll('input');
const productName= document.getElementById('tree-name');
const product = new ProductArray(productData);