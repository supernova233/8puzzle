
let boardSize = 3; // square
let fontSize = 30;

let isPlaying = false;
let helpTime = 6000; // milliSec

let canvasConfig = {
    width: 800,
    height: 600
}

let box = {
    x: 0,
    y: 0,
    size: 85,
    margin: 5
}

let boardConfig = {
    width: (box.size + box.margin) * boardSize,
    height: (box.size + box.margin) * boardSize
}

let startDraw = (canvasConfig.width / 2) - (boardConfig.width / 2);

let verPadding = 50;


// console.log(startDraw)

let debugMode = false;

let count = 0;
let moveCount = 0;
let h = 0;



let blankLocation = { gridX: 0, gridY: 0 };

let boardMap = new Array(boardSize);
for (var i = 0; i < boardMap.length; i++) {
    boardMap[i] = new Array(boardSize)
}

let boolMap = new Array(boardSize);
for (var j = 0; j < boolMap.length; j++) {
    boolMap[j] = new Array(boardSize)
}

let boardNumber = new Array(boardSize);
for (var i = 0; i < boardNumber.length; i++) {
    boardNumber[i] = new Array(boardSize)
}


let BlinkMap = [
    [false, false, false],
    [false, false, false],
    [false, false, false]
]


const GoalStage = [
    ["F", "O", "O"],
    ["T", "B", "A"],
    ["L", "L", " "]
]

boardNumber = [
    ["F", "O", "O"],
    ["T", "B", "A"],
    ["L", "L", " "]
]

// const GoalStage = [
//     ["1", "2", "3"],
//     ["4", "5", "6"],
//     ["7", "8", " "]
// ]

// boardNumber = [
//     ["1", "2", "3"],
//     ["4", "5", "6"],
//     ["7", "8", " "]
// ]




let drawBoard = () => {

    for (let i = 0; i < boardSize; i++) {
        // Ver
        for (let j = 0; j < boardSize; j++) {
            // Hor
            let x = ((box.size + box.margin) * j) + startDraw;
            let y = ((box.size + box.margin) * i) + verPadding;
            if (boardNumber[i][j] == " ") {
                fill(150, 150, 150);
                blankLocation = { gridX: j, gridY: i };
            }
            else {
                if (BlinkMap[i][j] == true) {
                    fill(232, 255, 209)
                    // console.log(BlinkMap[i][j])
                } else {
                    fill(255, 255, 255);
                }

            }


            square(x, y, box.size);

            textAlign(CENTER);
            fill(60, 60, 60);
            textSize(fontSize);
            text(boardNumber[i][j], x, y + (box.size / 2) - (fontSize / 2), box.size, box.size);
            textStyle(BOLD)

            boardMap[i][j] = { x: x, y: y, x2: x + box.size, y2: y + box.size }
        }

    }

    if (debugMode) {
        // On Debug Mode
        drawText()

        for (let i = 0; i < boardSize; i++) {
            // Ver
            for (let j = 0; j < boardSize; j++) {
                // Hor
                let xx = (box.size + box.margin) * j;
                let yy = (box.size + box.margin) * i;
                if (boolMap[i][j]) {
                    fill(78, 199, 78);
                    console.log(BlinkMap[0][3])
                } else {
                    fill(255, 162, 143);
                }

                square(xx + 100 + ((box.size + box.margin) * 3), yy, box.size);



            }

        }

    }




}

function drawText() {

    fill(60, 60, 60);
    textAlign(LEFT);
    textSize(15);
    text("h : " + h, 600, 30)
    text("Count : " + count, 600, 55)

}



let findLocation = (mX, mY) => {

    for (let i = 0; i < boardMap.length; i++) {
        for (let j = 0; j < boardMap[i].length; j++) {
            if (mX >= boardMap[i][j].x && mX <= boardMap[i][j].x2 && mY >= boardMap[i][j].y && mY <= boardMap[i][j].y2) {
                // console.log("Location is : "+ j + ","+ i); 
                return { gridX: j, gridY: i }
            }
        }
    }
    return -1
}

let canSwap = (loA = { gridX: 0, gridY: 0 }, loB = { gridX: 0, gridY: 0 }) => {

    // let x = loA.gridX - loB.gridX;
    // let y = loA.gridY - loB.gridY;
    // return x + "," + y

    if (loA.gridX - loB.gridX == -1 && loA.gridY - loB.gridY == 0 || loA.gridX - loB.gridX == 1 && loA.gridY - loB.gridY == 0) {
        // H Move
        return true
    } else if (loA.gridX - loB.gridX == 0 && loA.gridY - loB.gridY == -1 || loA.gridX - loB.gridX == 0 && loA.gridY - loB.gridY == 1) {
        // V Move
        return true
    } else {
        return false
    }
};






let swap = (arr, loA = { gridX: 0, gridY: 0 }, loB = { gridX: 0, gridY: 0 }) => {
    let temp = arr[loA.gridY][loA.gridX];
    arr[loA.gridY][loA.gridX] = arr[loB.gridY][loB.gridX];
    arr[loB.gridY][loB.gridX] = temp;
    return arr
}


let MoveWithDirect = (bL, direction) => {

    let newLo = { X: bL.gridX, Y: bL.gridY };
    let dirLowerC = direction.toLowerCase();


    switch (dirLowerC) {
        case "up":
            newLo.Y -= 1
            break;
        case "down":
            newLo.Y += 1
            break;
        case "left":
            newLo.X -= 1
            break;
        case "right":
            newLo.X += 1
            break;
    }

    // swap
    swap(boardNumber, bL, { gridX: newLo.X, gridY: newLo.Y })
    blankLocation = { gridX: newLo.X, gridY: newLo.Y };
    checkCurrect();
}


// let genNumber = () => {
//     let arr = [];
//     while (arr.length < boardSize ** 2) {
//         var r = Math.floor(Math.random() * (boardSize ** 2)) + 1;
//         if (arr.indexOf(r) === -1) {
//             arr.push(r)
//         }
//     }
//     let count = 0;
//     for (let i = 0; i < boardSize; i++) {
//         for (let j = 0; j < boardSize; j++) {
//             if (arr[count] == (boardSize ** 2)) {
//                 boardNumber[i][j] = " "
//                 blankLocation.gridX = j;
//                 blankLocation.gridY = i;
//             } else {
//                 boardNumber[i][j] = arr[count].toString()
//             }
//             boolMap[i][j] = false;
//             count++
//         }

//     }
//     // console.log(boardNumber)
//     // console.log(boolMap)
//     // console.log(boardMap)

// }

let checkCurrect = () => {
    h = 0;
    for (let i = 0; i < boolMap.length; i++) {
        for (let j = 0; j < boolMap[i].length; j++) {
            if (boardNumber[i][j] === GoalStage[i][j]) {
                boolMap[i][j] = true;
            } else {
                boolMap[i][j] = false;
                h += 1;
            }
        }
    }
    // console.log(boolMap)
}

function resetGame() {
    genNumber();
    count = 0;
}

let selectGameMode = (evt) => {
    if (evt.target.checked) {
        // console.log(" Is on Degug mode !")
        debugMode = true
    } else {
        // console.log(" Is on Normal mode !")
        debugMode = false
    }
}





let img;
let imgHint;

function preload() {

    img = loadImage('./img/Logo.png');
    imgHint = loadImage('./img/football.jpeg');
}


let drawIndex = () => {
    let LogoImg = createImg(
        './img/Logo.png'
    );
    LogoImg.position(225, 105);
}

let numTime = 0;
let textTime = "00 : 00";
let isTimer = false;

let timer = () => {

    numTime += 1

    let seconds = numTime % 60;
    let minutes = Math.floor(numTime / 60);

    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }

    textTime = minutes + " : " + seconds;
}
let clock;

let drawTime = () => {

    fill(50, 50, 50);
    textAlign(LEFT);
    textSize(24);
    text(textTime, 20, 50)
}

let drawHint = () => {

}

let helpTimer;
let countdown = () => {
    helpTimer = setTimeout(helpPlayer, helpTime)
}

let startGame = () => {

    randomize();
    numTime = 0;
    moveCount = 0;
    isPlaying = true;
    isEndgame = false;
    clock = setInterval(timer, 1000)
    timer() // Start timer
}

let playBtn = () => {
    fill(255, 255, 255);
    rect(352, 350, 150, 60, 15);

    fill(150, 150, 150);
    // fill(255, 163, 26);
    textAlign(CENTER);
    textSize(fontSize);
    text("Play", 352, 365, 150, 365)
}


let isEndgame = false;

function win() {

    let isWin = [boolMap[0].every((val) => val === true), boolMap[1].every((val) => val === true), boolMap[2].every((val) => val === true)].every((val) => val === true)
    // console.log(isWin)

    if (isWin) {
        setTimeout(() => {
            // alert("You Win !!!")
            isEndgame = true;
            isPlaying = false;

            document.getElementById("timeTaked").innerHTML = textTime;
            document.getElementById("moved").innerHTML = moveCount;

            var myModal = document.getElementById('staticBackdrop');
            var modal = bootstrap.Modal.getOrCreateInstance(myModal);
            modal.show()

            clearInterval(clock) // stop timer
            console.warn("You Win !!!")
        }, 100)

        // genNumber()
    }
    // console.log("trick !!!")
    // console.log(boardNumber)
    // console.log(GoalStage)

}

let DirectionToGrid = (dir,blankLocation) => {
    switch (dir) {
        case "up":
            return {gridX:blankLocation.gridX, gridY:blankLocation.gridY - 1}
            break;
        case "down":
            return {gridX:blankLocation.gridX, gridY:blankLocation.gridY + 1}
            break;
        case "left":
            return {gridX:blankLocation.gridX -1, gridY:blankLocation.gridY}
            break;
        case "right":
            return {gridX:blankLocation.gridX +1, gridY:blankLocation.gridY}
            break;
    }
}

let blinking;
let Blink = (x,y) => {
    blinking = setInterval(() => {
        BlinkMap[y][x] = !BlinkMap[y][x];
        // console.log(BlinkMap[0][3])
    }, 300)
}



