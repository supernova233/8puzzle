






function setup() {
    createCanvas(canvasConfig.width, canvasConfig.height)

    if (!isPlaying) {
        image(img, 225, 105);
    }

}

function draw() {
    background(250);

    if (isPlaying) {
        background(240);
        image(imgHint,canvasConfig.width - 200, 20)
        drawBoard();
        drawTime();

    } else {
        if (!isPlaying) image(img, 225, 65)
        playBtn()
    }


}


function mouseClicked(evt) {


    if (isPlaying) {

        if (findLocation(evt.layerX, evt.layerY) !== -1) {
            if (canSwap(findLocation(evt.layerX, evt.layerY), blankLocation) && isEndgame != true) {
                boardNumber = swap(boardNumber, findLocation(evt.layerX, evt.layerY), blankLocation);
                moveCount++;
                checkCurrect();
                win();
            }

        }
    }else{
        if (evt.layerX >= 352 && evt.layerY >=350 && evt.layerX <= 502 && evt.layerY <= 410){
            startGame();
            console.log("PLAY !!")
        }
        
    }




    // console.log(findLocation(evt.layerX, evt.layerY))
    // console.log(boardMap)
    // console.log(evt)




}


