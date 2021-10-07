function setup() {
    createCanvas(canvasConfig.width, canvasConfig.height)
}

function draw() {
    background(240);

    drawBoard()
    
    
}


function mouseClicked(evt) {
    
    if (findLocation(evt.layerX, evt.layerX) !== -1) {
        if (canSwap(findLocation(evt.layerX, evt.layerX), blankLocation)) {
            boardNumber = swap(boardNumber, findLocation(evt.layerX, evt.layerX), blankLocation);
            checkCurrect();
            win();
        }

    }
    

    console.log(findLocation(evt.layerX, evt.layerX))

    console.log(boardMap)
    console.log(evt)
    // console.log(evt)




}


