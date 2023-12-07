const day = "5"
const fs = require('fs')
const sample = fs.readFileSync(`2023/day_${day}_sample.txt`, { encoding: 'utf-8' })
const data = fs.readFileSync(`2023/day_${day}.txt`, { encoding: 'utf-8' })

const solve = (data) => {
    const parts = data.split("\n")
    const seeds = parts[0].split("seeds:")[1].trim().split(" ")
    const prompt = parts.slice(2, parts.length)
    const directions = {}
    let currentPrompt

    prompt.forEach(line => {
        if (line == "") {
            currentPrompt = undefined
        } else if (line.includes("map")) {
            let currentPrompt = line.split(" map:")[0]
            directions[currentPrompt] = []
        } else {
            const [
                destination,
                source,
                rangeLength
            ] = line.split(" ")
            console.log(destination, source, rangeLength)
        }
    })
}

solve(sample)