




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
        name: "A", h: 5, child: [
            { name: "C", h: 3, child: [] },
        ]
    },
    {
        name: "B", h: 4, child: [
            {
                name: "D", h: 3, child: [
                    { name: "F", h: 3, child: [] },
                    { name: "G", h: 4, child: [] },
                ]
            },
            {
                name: "E", h: 2, child: [
                    { name: "H", h: 0, child: [] },
                    { name: "I", h: 3, child: [] },
                ]
            },

        ]
    },
]

// console.log(boardNumber);
// console.log(arr1);

let test = () => {

    console.log("Starting...");
    GBFS(NodeArr, 5);

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
let Test_count = 0;

let findMin = (arr) => {
    let h_inLevel = arr.map(x => x.h);
    return Math.min(...h_inLevel);
}

let GBFS = (inputArr, heuristic) => {

    Test_count++;
    console.log("Count :" + Test_count)

    let min_h = findMin(inputArr)
    inputArr = inputArr.sort((a,b)=> a.h - b.h)
    if (inputArr.length > 0) {

        for (let i = 0; i < inputArr.length; i++) {
            if (inputArr[i].h !== target_h) {
                //continue search

                if (inputArr[i].h == min_h && inputArr[i].h <= heuristic) {
                    // Best first select
                    path.push(inputArr[i].name);
                    GBFS(inputArr[i].child, inputArr[i].h)
                    return

                } else{

                    if (inputArr[i].h < heuristic && inputArr[i].h != target_h) {
                         path.push(inputArr[i].name);
                         GBFS(inputArr[i].child, inputArr[i].h + 1)
                         return
                    }
                }

            } else {
                //
                path.push(inputArr[i].name);
                console.warn("Found !!!")
                console.log(path)
                return
            }


        }
    }


}
