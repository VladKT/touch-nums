'use strict'
var gCurrentCells
var gNumClicked
var gMili
var gInterval;

function init(cellsNum = 16) {
    gMili = 0;
    gCurrentCells = cellsNum;
    gNumClicked = 1;
    var strHTML = '<tr>';
    var shuffledNums = shuffledArr(cellsNum);
    for (var i = 1; i <= cellsNum; i++) {
        strHTML += `<td onclick="cellClicked(this)">${shuffledNums.pop()}</td>`
        if (i % Math.sqrt(cellsNum) === 0) {
            strHTML += '</tr><tr>';
        }
    }
    strHTML = strHTML.slice(0, strHTML.length - 4);
    document.querySelector('tbody').innerHTML = strHTML;
}

function shuffledArr(uperBound) {
    var shuffledArr = [];
    for (var i = 0; i < uperBound; i++) {
        shuffledArr.push(i + 1);
    }
    for (var i = 0; i < uperBound; i++) {
        var rnd = getRandomIntInclusive(0, uperBound - 1);
        var tmp = shuffledArr[i];
        shuffledArr[i] = shuffledArr[rnd];
        shuffledArr[rnd] = tmp;
    }
    return shuffledArr;
}

function clickCell(elCell) {
    elCell.innerText = 'test';
}

function cellClicked(elClicked) {
    if (+elClicked.innerText === 1) gInterval = setInterval(runTimer, 10);

    if (gNumClicked === +elClicked.innerText) {
        elClicked.classList.add('clicked')
        gNumClicked++;
    }
    if (gNumClicked === gCurrentCells + 1) {
        document.querySelector('h2').innerText = 'A WINNER IS YOU!';
        console.log('A WINNER IS YOU!');
        clearInterval(gInterval);
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function runTimer() {
    var x = getRandomIntInclusive(0, 9)
    document.querySelector('.timer').innerText = 'Timer: ' + gMili / 100 + x;
    gMili += 1;
}