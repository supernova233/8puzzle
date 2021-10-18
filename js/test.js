




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
                name: "D", h: 2, child: [
                    { name: "F", h: 3, child: [] },
                    { name: "G", h: 4, child: [] },
                ]
            },
            {
                name: "E", h: 3, child: [
                    { name: "H", h: 1, child: [] },
                    { name: "I", h: 3, child: [] },
                ]
            },

        ]

    },

    {
        name: "J", h: 4, child: [
            {
                name: "K", h: 4, child: [
                    { name: "M", h: 3, child: [] },
                    { name: "N", h: 4, child: [] },
                ]
            },
            {
                name: "L", h: 3, child: [
                    { name: "O", h: 0, child: [] },
                    { name: "P", h: 3, child: [] },
                ]
            },

        ]

    },


]

// console.log(boardNumber);
// console.log(arr1);

let test = () => {

    // console.log("Starting...");
    GBFS(NodeArr, 5);

    // randomize()

}




let target_h = 0;
let path = [];
let visited = [];
let Test_count = 0;

let findMin = (arr) => {
    let h_inLevel = arr.map(x => x.h);
    return Math.min(...h_inLevel);
}

function getParent(Tree, name, _callback) {
    // console.log(name)
    if (NodeArr.some((el) => el.name == name)) {
        // console.log(name)
        _callback(name)
        return
    } else {
        // console.log(name)
        for (let i = 0; i < Tree.length; i++) {
            if (NodeArr[i].name == name) {
                console.log(name)
                return
            } else {

                if (Tree[i].child.some((el) => el.name == name)) {
                    getParent(NodeArr, Tree[i].name, _callback)
                } else {
                    getParent(Tree[i].child, name, _callback)
                }

            }

        }

    }


}

function GBFS(inputArr, heuristic) {

    // Test_count++;
    // console.log("Count :" + Test_count)

    let min_h = findMin(inputArr)
    inputArr = inputArr.sort((a, b) => a.h - b.h)
    if (inputArr.length > 0) {

        for (let i = 0; i < inputArr.length; i++) {
            if (inputArr[i].h !== target_h) {
                //continue search

                if (inputArr[i].h == min_h && inputArr[i].h <= heuristic) {
                    // Best first select
                    path.push(inputArr[i].name);
                    GBFS(inputArr[i].child, inputArr[i].h)



                } else {

                    if (inputArr[i].h < heuristic && inputArr[i].h != target_h) {
                        path.push(inputArr[i].name);
                        GBFS(inputArr[i].child, inputArr[i].h + 1)


                    }
                }

            } else {
                //
                path.push(inputArr[i].name);

                getParent(NodeArr, inputArr[i].name, (Parent) => {
                    console.log(" Root Node == "+Parent)
                })
                console.warn("Found !!!")
                console.log(path)
                return
            }


        }
    }


}





