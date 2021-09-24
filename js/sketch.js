function setup() {
    createCanvas(800, 210)
}

function draw() {
    background(240);

    drawBoard()
    
    
}


function mouseClicked(evt) {
    
    if (findLocation(evt.x, evt.y) !== -1) {
        if (canSwap(findLocation(evt.x, evt.y), blankLocation)) {
            boardNumber = swap(boardNumber, findLocation(evt.x, evt.y), blankLocation);
            checkCurrect();
            win();
        }

    }
    

    // console.log(boardMap)
    // console.log(findLocation(evt.x,evt.y))




}


