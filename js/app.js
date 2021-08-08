
let boardSize = 3; // square
let fontSize = 30;

let debugMode = false;

let count = 0;
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

let boardNumber = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", " "]
]
const GoalStage = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", " "]
]

let box = {
    x: 0,
    y: 0,
    size: 65,
    margin: 5
}


let drawBoard = () => {

    for (let i = 0; i < boardSize; i++) {
        // Ver
        for (let j = 0; j < boardSize; j++) {
            // Hor
            let x = (box.size + box.margin) * j;
            let y = (box.size + box.margin) * i;
            if (boardNumber[i][j] == " ") {
                fill(150, 150, 150);
                blankLocation = { gridX: j, gridY: i };
            } else {
                fill(255, 255, 255);
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
    count += 1;
    let temp = arr[loA.gridY][loA.gridX];
    arr[loA.gridY][loA.gridX] = arr[loB.gridY][loB.gridX];
    arr[loB.gridY][loB.gridX] = temp;
    return arr
}


let genNumber = () => {
    let arr = [];
    while (arr.length < boardSize ** 2) {
        var r = Math.floor(Math.random() * (boardSize ** 2)) + 1;
        if (arr.indexOf(r) === -1) {
            arr.push(r)
        }
    }
    let count = 0;
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (arr[count] == (boardSize ** 2)) {
                boardNumber[i][j] = " "
                blankLocation.gridX = j;
                blankLocation.gridY = i;
            } else {
                boardNumber[i][j] = arr[count].toString()
            }
            boolMap[i][j] = false;
            count++
        }

    }
    // console.log(boardNumber)
    // console.log(boolMap)
    // console.log(boardMap)

}

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



function win() {

    let isWin = [boolMap[0].every((val) => val === true), boolMap[1].every((val) => val === true), boolMap[2].every((val) => val === true)].every((val) => val === true)
    // console.log(isWin)

    if (isWin) {
        setTimeout(() => {
            alert("You Win !!!")
            console.warn("You Win !!!")
        }, 100)

        // genNumber()
    }
    // console.log("trick !!!")
    // console.log(boardNumber)
    // console.log(GoalStage)

}

genNumber()
