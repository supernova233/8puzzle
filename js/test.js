




let arr1 = new Array(3)
for (var i = 0; i < boardNumber.length; i++) {
    arr1[i] = new Array(boardSize)
}

for (var i = 0; i < boardNumber.length; i++) {
    for (var j = 0; j < boardNumber.length; j++) {
        arr1[j][i] = boardNumber[j][i];
    }
}




let NodeArr = [
    {
        name: "A", h: 9, arr: [
            {
                name: "D", h: 8, arr: [
                    { name: "L", h: 8, arr: [] },
                    { name: "M", h: 9, arr: [] },

                ]
            },
            {
                name: "E", h: 7, arr: [
                    { name: "N", h: 8, arr: [] },
                    { name: "O", h: 7, arr: [] }
                ]
            }
        ]
    },
    {
        name: "B", h: 8, arr: [
            {
                name: "F", h: 9, arr: [
                    { name: "P", h: 8, arr: [] },
                    { name: "Q", h: 9, arr: [] },
                ]
            },
            {
                name: "G", h: 8, arr: [
                    { name: "R", h: 8, arr: [] },
                    { name: "S", h: 9, arr: [] },
                ]
            },
            { name: "H", h: 8, arr: [] }
        ]
    },
    {
        name: "C", h: 9, arr: [
            {
                name: "I", h: 9, arr: [
                    { name: "T", h: 7, arr: [] },
                    { name: "U", h: 8, arr: [] },
                ]
            },
            { name: "J", h: 9, arr: [] },
            {
                name: "K", h: 8, arr: [
                    {
                        name: "V", h: 7, arr: [
                            { name: "Y", h: 6, arr: [] },
                        ]
                    },
                    {
                        name: "W", h: 7, arr: [
                            { name: "Z", h: 5, arr: [] },
                        ]
                    },
                    {
                        name: "X", h: 8, arr: [
                            {
                                name: "1A", h: 4, arr: [
                                    { name: "1C", h: 2, arr: [] }
                                ]
                            },
                            {
                                name: "1B", h: 4, arr: [
                                    { name: "1D", h: 0, arr: [] }
                                ]
                            },
                        ]
                    },
                ]
            },

        ]
    },

]

// console.log(boardNumber);
// console.log(arr1);

let test = () => {

    console.log("Starting...");
    GBFS(NodeArr, 9);

    // arr1[0][0] = "Z";

    // randomize()
    // findVal(NodeArr)

}

let findVal = (inputArr) => {

    if (inputArr.length > 0) {
        for (var i = 0; i < inputArr.length; i++) {
            findVal(inputArr[i]);
        }
    } else {
        console.log(inputArr);
        return
    }
}


let target_h = 0;
let path = [];
let visited = [];


let GBFS = (inputArr, heuristic) => {
    let h_inLevel = inputArr.map(element => element.h);
    let min = Math.min(...h_inLevel);
    if (inputArr.length > 0) {
        for (let i = 0; i < inputArr.length; i++) {
            let NodeName = (element) => element === inputArr[i].name
            if (inputArr[i].h === min && !visited.some(NodeName) && inputArr[i].h < heuristic) {
                //best node
                visited.push(inputArr[i].name)
                GBFS(inputArr[i].arr,inputArr[i].h)


            } else if ( inputArr[i].h >= heuristic && !visited.some(NodeName)) {
                for (let j = 0; j < inputArr[i].arr.length; j++) {
                    if(inputArr[i].arr[j].h < heuristic){
                        
                    }
                    
                    
                }
            }
            


        }
    }
}
