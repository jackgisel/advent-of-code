const fs = require('fs')
const sampleLines = fs.readFileSync('2023/day_4_sample.txt', { encoding: 'utf-8' }).split('\n')
const realLines = fs.readFileSync('2023/day_4.txt', { encoding: 'utf-8' }).split('\n')

const parseGame = (game) => {
    const parts = game.split(":")
    const gameId = parts[0].split(" ")[1]
    const numberParts = parts[1].split("|")
    const winningNumbers = numberParts[0].trim().split("  ").flat().join(" ").split(" ")
    const ourNumbers = numberParts[1].trim().split("  ").flat().join(" ").split(" ")

    return {
        gameId,
        winningNumbers,
        ourNumbers
    }
}

const solve = (lines) => lines.reduce((acc, cur) => {
    let gameScore = 0

    const gameDetails = parseGame(cur)
    gameDetails.winningNumbers.forEach(num => {
        if (gameDetails.ourNumbers.includes(num)) {
            if (gameScore == 0) gameScore = 1
            else gameScore *= 2
        }
    })

    return acc + gameScore
}, 0)

const sampleAnswer = solve(sampleLines)
console.log("Found: ", sampleAnswer, " Expected: 13")

const answer = solve(realLines)
console.log("Found: ", answer, " Expected: idk")