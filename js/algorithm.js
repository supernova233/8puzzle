





let botBoolMap = new Array(3);
for (let i = 0; i < botBoolMap.length; i++) {
    botBoolMap[i] = new Array(3);
}

let botBlankLocation = { gridX: 0, gridY: 0 };

let current_h = 9;
let boardNode = [];

let botCheck = () => {
    for (let i = 0; i < botBoolMap.length; i++) {
        for (let j = 0; j < botBoolMap[i].length; j++) {
            if (botBoard[i][j] === GoalStage[i][j]) {
                botBoolMap[i][j] = true;
            } else {
                botBoolMap[i][j] = false;
            }
        }
    }
}

let copyArr = (arr) => {
    let NewArr = new Array(boardSize);
    for (var i = 0; i < boardNumber.length; i++) {
        NewArr[i] = new Array(boardSize)
    }

    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length; j++) {
            NewArr[j][i] = arr[j][i];
        }
    }

    return NewArr;
}

let botBoard = copyArr(boardNumber);

let helpPlayer = () => {


    botBoard = copyArr(boardNumber);
    botBlankLocation = { ...blankLocation }
    current_h = get_h(botBoard)

    greedyBFS(botBoard, botBlankLocation, current_h);
    botCheck();
}




let directionAvailable = (currentLocation) => {
    let direction = ['up', 'down', 'left', 'right']
    let available = new Array();
    for (let i = 0; i < direction.length; i++) {
        if (botCanMove(currentLocation, direction[i])) {
            available.push(direction[i]);
        }
    }

    return available;

}

let invertDirection = (dir) => {
    switch (dir) {
        case "up":
            return "down"
            break;
        case "down":
            return "up"
            break;
        case "left":
            return "right"
            break;
        case "right":
            return "left"
            break;
    }
}



let get_h = (parallelBoard) => {
    let h = 0;

    for (let i = 0; i < botBoard.length; i++) {
        for (let j = 0; j < botBoard.length; j++) {
            if (parallelBoard[j][i] != GoalStage[j][i]) {
                h += 1;
            }
        }
    }
    // console.log(h)
    // console.log(parallelBoard)
    // console.log(GoalStage)
    return h
}











let botCanMove = (currentLocation, direction = "") => {
    let dirLowerC = direction.toLowerCase();
    if (dirLowerC == "up" && currentLocation.gridY > 0) {
        return true;
    } else if (dirLowerC == "down" && currentLocation.gridY < GoalStage.length - 1) {
        return true;
    } else if (dirLowerC == "left" && currentLocation.gridX > 0) {
        return true;
    } else if (dirLowerC == "right" && currentLocation.gridX < GoalStage.length - 1) {
        return true;
    } else {
        return false;
    }
}



let botMoveTo = (bB, bL, direction) => {

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
    // console.log(newLo)

    // swap
    let tempBoard = copyArr(bB);
    tempBoard = swap(tempBoard, bL, { gridX: newLo.X, gridY: newLo.Y })

    // return board
    return tempBoard;

}

let randomMove = () => {
    let direction = directionAvailable(blankLocation)
    let ranNum = Math.floor(Math.random() * direction.length);
    MoveWithDirect(blankLocation, direction[ranNum])
}

let randomize = () => {
    let iterate = 100;
    for (var i = 0; i < iterate; i++) {
        randomMove()
        // console.log(boardNumber)
    }



}

randomize();

let moveSequence = new Array(boardSize);

let get_CurrentLocation = (Board) => {
    for (let i = 0; i < Board.length; i++) {
        for (let j = 0; j < Board[i].length; j++) {
            if (Board[i][j] === " ") {
                return { gridX: j, gridY: i }
            }

        }

    }
}



function greedyBFS(bB, currentLocation, heuristic) {
    console.log(boardNode.length)
    if (boardNode.length == 0) {
        let direction = directionAvailable(currentLocation)
        let obj = {};
        for (let i = 0; i < direction.length; i++) {

            obj = { direction: direction[i], h: get_h(botMoveTo(bB, currentLocation, direction[i])), board: botMoveTo(bB, currentLocation, direction[i]), child: [] }
            boardNode.push(obj)
            console.log(obj)
        }
    } else if (boardNode.length > 0) {

        let h_inLevel = boardNode.map(element => element.h);
        let min = Math.min(...h_inLevel);

        for (let i = 0; i < boardNode.length; i++) {

            // if (boardNode[i].h < heuristic && boardNode[i].h == min) {
                let cLo = get_CurrentLocation(boardNode[i].board);
                let direction = directionAvailable(cLo)
                var index = direction.indexOf(invertDirection(boardNode[i].direction));
                if (index !== -1) {
                    direction.splice(index, 1);
                }
                let obj = {};
                
                for (let j = 0; j < direction.length; j++) {
                    console.log(direction[j])
                    
                    obj = { direction: direction[j], h: get_h(botMoveTo(boardNode[i].board, cLo, direction[j])), board: botMoveTo(boardNode[i].board, cLo, direction[j]), child: [] }
                    boardNode[i].child.push(obj)
                    console.log(obj)
                }
            // }
        }

        console.log(boardNode)
    }



}
