

let moveSequence = new Array(boardSize);



let botBoolMap = new Array(3);
for (let i = 0; i < botBoolMap.length; i++) {
    botBoolMap[i] = new Array(3);
}

let botBlankLocation = { gridX: 0, gridY: 0 };


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

let copyArr = (arr)=> {
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
    botBlankLocation = {...blankLocation}

    greedyBFS(botBoard,botBlankLocation);
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



let get_h = (parallelBoard) => {
    let h = 0;
    
    for (let i = 0; i < botBoard.length; i++) {
        for (let j = 0; j < botBoard.length; j++) {
            if (parallelBoard[j][i] != GoalStage[j][i]) {
                h += 1;
            }
        }
    }
    console.log(h)
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



let botMoveTo = (bB,bL, direction) => {

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
    let tempBoard = [...bB];
    tempBoard = swap(tempBoard,bL,{ gridX: newLo.X, gridY: newLo.Y })

    // return board
    return tempBoard;

}



function greedyBFS(bB,currentLocation) {

    let direction = directionAvailable(currentLocation)
    let mem = new Array();
    let obj = {};
    for (let i = 0; i < direction.length; i++) {

        obj = { direction: direction[i], h: get_h(botMoveTo(bB,currentLocation, direction[i])) }
        mem.push(obj)
    }
    if(mem){
        console.log(mem)
    }
}
