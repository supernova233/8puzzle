
let TravelList = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",

]

let Visited = []

let randnum = (max) => {
    let numb = Math.floor(Math.random() * max)
}
let getDistance = (max) => {
    let numb = Math.floor(Math.random() * max)
    return numb
}
let minDistance = (distanceList) => {
    return Math.min(...distanceList)
}

let Stp = (TList) => {
    if (TList.length > 0) {

        // let p = getDistance(TList.length)
        let Nodedist = []; // 
        for (let i = 0; i < TList.length; i++) {
            Nodedist.push(getDistance(6000))

        }

        console.log(Nodedist)
        console.log(TList)

        for (let j = 0; j < Nodedist.length; j++) {

            if (Nodedist[j] == minDistance(Nodedist)) {
                console.log(TList[j] + " is Shortest")
                Visited.push(TList[j]); // ใส่ในรายการใหม่
                TList.splice(j, 1) // ลบ ออกจากรายการเดิม

                Stp(TList)
            }

        }



    } else {
        console.log("== END ==")
        console.log(Visited)
        return
    }
    console.log("==========================")
}
Stp(TravelList)

let STPNode = [
    {
        name: "S", dist: 0, child: [
            {
                name: "F", dist: 1300, child: [
                    {
                        name: "E", dist: 2900, child: [
                            { name: "D", dist: 1600, child: [] },
                            { name: "B", dist: 1200, child: [] },
                        ]
                    },
                    {
                        name: "G", dist: 2400, child: [
                            { name: "E", dist: 900, child: [] },
                            { name: "B", dist: 1900, child: [] },
                            { name: "A", dist: 2100, child: [] },
                        ]
                    },
                    { name: "I", dist: 6300, child: [] }
                ]
            }
        ]
    }
]



console.log(STPNode)