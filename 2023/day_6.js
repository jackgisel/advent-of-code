// sample
// const races = {
//     7: 9,
//     15: 40,
//     30: 200
// }

// part 1
// const races = {
//     44: 283,
//     70: 1134,
//     70: 1134,
//     80: 1491
// }

// part 2
const races = {
    44707080: 283113411341491,
}

function getWays(seconds, meters) {
    let successfulWays = 0

    for (let i = 0; i <= seconds; i++) {
        const distanceTraveled = i * (seconds - i)
        if (distanceTraveled > meters) successfulWays++
    }

    return successfulWays
}

const res = Object.keys(races).reduce((acc, race) => {
    let ways = getWays(race, races[race])
    console.log(race, ways)
    return ways * acc
}, 1)

console.log(res)