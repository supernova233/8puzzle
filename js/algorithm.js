

// let moveSequence = new Array();

// let botBoard = new Array(3);
// for (let i = 0; i < botBoard.length; i++) {
//     botBoard[i] = new Array(3);
// }


// let botBoolMap = new Array(3);
// for (let i = 0; i < botBoolMap.length; i++) {
//     botBoolMap[i] = new Array(3);
// }

// let botBlankLocation = { gridX: 0, gridY: 0 };


// let botCheck = () => {
//     for (let i = 0; i < botBoolMap.length; i++) {
//         for (let j = 0; j < botBoolMap[i].length; j++) {
//             if (botBoard[i][j] === GoalStage[i][j]) {
//                 botBoolMap[i][j] = true;
//             } else {
//                 botBoolMap[i][j] = false;
//             }
//         }
//     }
// }

// function helpPlayer() {
//     botCheck();
//     botBlankLocation = { ...blankLocation }; //make copy
//     // console.log(botBlankLocation)
//     botBoard = [...boardNumber]; //make copy
//     // console.log(botBoard)
//     greedyBFS(botBlankLocation);

//     // console.log(directionAvailable(botBlankLocation));
// }




// let directionAvailable = (currentLocation) => {
//     let direction = ['up', 'down', 'left', 'right']
//     let available = new Array();
//     for (let i = 0; i < direction.length; i++) {
//         if (botCanMove(currentLocation, direction[i])) {
//             available.push(direction[i]);
//         }
//     }

//     return available;

// }



// let get_h = (preMove) => {
//     let h = 0;
//     console.log(botBoard[preMove.gridY][preMove.gridX]);
//     // for (let i = 0; i < botBoard.length; i++) {
//     //     for (let j = 0; j < botBoard.length; j++) {
//     //         if (botBoard[preMove.gridY][preMove.gridX] !== GoalStage[i][j]) {
//     //             h += 1;
//     //         }
//     //     }
//     // }
//     // return h
// }















// let botCanMove = (currentLocation, direction = "") => {
//     let dirLowerC = direction.toLowerCase();
//     if (dirLowerC == "up" && currentLocation.gridY > 0) {
//         return true;
//     } else if (dirLowerC == "down" && currentLocation.gridY < GoalStage.length - 1) {
//         return true;
//     } else if (dirLowerC == "left" && currentLocation.gridX > 0) {
//         return true;
//     } else if (dirLowerC == "right" && currentLocation.gridX < GoalStage.length - 1) {
//         return true;
//     } else {
//         return false;
//     }
// }



// let botMoveTo = (bL, direction) => {

//     let newLo = { X: bL.gridX, Y: bL.gridY };
//     let dirLowerC = direction.toLowerCase();


//     switch (dirLowerC) {
//         case "up":
//             newLo.Y -= 1
//             break;
//         case "down":
//             newLo.Y += 1
//             break;
//         case "left":
//             newLo.X -= 1
//             break;
//         case "right":
//             newLo.X += 1
//             break;
//     }

//     return { gridX: newLo.X, gridY: newLo.Y };

// }



// function greedyBFS(currentLocation) {

//     let direction = directionAvailable(currentLocation)
//     let mem = new Array();
//     let obj = {};
//     for (let i = 0; i < direction.length; i++) {
//         obj = { direction: direction[i], h: get_h(botMoveTo(botBlankLocation, direction[i])) }
//         mem.push(obj)
//     }

//     for (let j; j < mem.length; j++){
//             console.log(mem[j])
//     }
    

// }
