const fs = require('fs')
const sampleLines = fs.readFileSync('2023/day_4_sample.txt', { encoding: 'utf-8' }).split('\n')
const realLines = fs.readFileSync('2023/day_4.txt', { encoding: 'utf-8' }).split('\n')

const parseGame = (game) => {
    const parts = game.split(":")
    const gameId = (parseInt(parts[0].split(" ")[1]) ? parts[0].split(" ")[1] : parts[0].split("  ")[1]).trim()
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

const solvePart2 = (lines) => {
    const cards = {}
    lines.forEach((_, idx) => {
        cards[idx + 1] = 1
    })

    lines.forEach((cur, idx) => {
        const gameDetails = parseGame(cur)
        console.log(gameDetails.gameId)
        const copies = cards[gameDetails.gameId]
        console.log(copies)
        const wonCards = gameDetails.winningNumbers.reduce((acc, num) => gameDetails.ourNumbers.includes(num) ? acc + 1 : acc, 0)

        for (let i = idx + 1; i < idx + 1 + wonCards; i++) {
            const nextGameId = i + 1
            cards[nextGameId] += (1 * copies)
            console.log(nextGameId, cards[`${nextGameId}`])
        }
    })

    return Object.keys(cards).reduce((acc, cur) => acc + cards[cur], 0)
}

const sampleAnswer = solve(sampleLines)
console.log("Found: ", sampleAnswer, " Expected: 13")

const answer = solve(realLines)
console.log("Found: ", answer, " Expected: 21088")

const p2SampleAnswer = solvePart2(sampleLines)
console.log("Found: ", p2SampleAnswer, " Expected: 30")

const p2Answer = solvePart2(realLines)
console.log("Found: ", p2Answer, " Expected: 6874754")
