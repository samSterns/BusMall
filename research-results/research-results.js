import { findById } from '../utils/utils.js';

const parsedViewsArray = JSON.parse(localStorage.trackedArray);
const parsedUserPicksArray = JSON.parse(localStorage.userPicksArray);
function mergeArrays(viewsArray, clicksArray) {
    const returnMergedArray = [];
    viewsArray.forEach(element => {

        const newMergedItem = element;      
        const clickObject = findById(clicksArray, newMergedItem.id) || { timesClicked: 0 };
        newMergedItem.clicks = clickObject.timesClicked; 
        returnMergedArray.push(newMergedItem);
    });
    return returnMergedArray;
}
const tripleThreatArray = mergeArrays(parsedViewsArray, parsedUserPicksArray);
function convertClicksArray(array) {
    const returnClicksArray = [];
    array.forEach(element => {
        returnClicksArray.push(element.clicks);
    });
    return returnClicksArray;
} 

function convertViewsArray(array) {
    const returnViewsArray = [];
    array.forEach(element => {
        returnViewsArray.push(element.timesShown);
    });
    return returnViewsArray;
}
function convertLabelsArray(array) {
    const returnLabelsArray = [];
    array.forEach(element => {
        returnLabelsArray.push(element.id);
    });
    return returnLabelsArray;
}

const ctx = document.getElementById('chart').getContext('2d');
const labels = convertLabelsArray(tripleThreatArray);
const data = convertViewsArray(tripleThreatArray);
const clicks = convertClicksArray(tripleThreatArray);

const Chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Times Displayed',
            data: data,
            backgroundColor: 'white'
        },
        {
            label: 'Times Clicked',
            data: clicks,
            backgroundColor: '#E6342F'
        }
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});