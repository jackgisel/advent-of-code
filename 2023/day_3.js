const fs = require('fs')

function isDigit(char) {
    return /[0-9]/.test(char)
}

function isSymbol(char) {
    return !("1234567890.".includes(char))
}

function checkNeighborsForSymbol(xIndex, x, yIndex, y) {
    const anySymbols = []
    // Above neighbor
    if (yIndex !== 0) {
        const previousRow = y[yIndex - 1]
        anySymbols.push(isSymbol(previousRow[xIndex - 1]))
        anySymbols.push(isSymbol(previousRow[xIndex]))
        anySymbols.push(isSymbol(previousRow[xIndex + 1]))
    }
    // Current Row
    anySymbols.push(isSymbol(x[xIndex - 1]))
    anySymbols.push(isSymbol(x[xIndex + 1]))
    // Below neighbor
    if (yIndex !== (y.length - 1)) {
        const nextRow = y[yIndex + 1]
        anySymbols.push(isSymbol(nextRow[xIndex - 1]))
        anySymbols.push(isSymbol(nextRow[xIndex]))
        anySymbols.push(isSymbol(nextRow[xIndex + 1]))
    }
    return anySymbols.some((x) => !!x)
}

function solvePart1(lines) {
    let sum = 0

    lines.forEach((line, yIndex) => {
        let currentNumber = null
        let hasBeenAdjecentToSymbol = false
        line.split("").forEach((x, xIndex) => {
            if (!currentNumber) {
                if (isDigit(x)) {
                    currentNumber = x
                    hasBeenAdjecentToSymbol = hasBeenAdjecentToSymbol || checkNeighborsForSymbol(
                        xIndex,
                        line,
                        yIndex,
                        lines
                    )
                }
            } else {
                if (isDigit(x)) {
                    currentNumber = currentNumber + x
                    hasBeenAdjecentToSymbol = hasBeenAdjecentToSymbol || checkNeighborsForSymbol(
                        xIndex,
                        line,
                        yIndex,
                        lines
                    )
                }

                if (!isDigit(x) || xIndex === line.length - 1) {
                    if (hasBeenAdjecentToSymbol) {
                        sum += parseInt(currentNumber)
                    }
                    currentNumber = null
                    hasBeenAdjecentToSymbol = false
                }
            }
        })
    });


    return sum
}

// Test cases
const sampleLines = fs.readFileSync('2023/day_3_sample.txt', { encoding: 'utf-8' }).split('\n')
const sampleAnswer = solvePart1(sampleLines)
console.log("Sample Answer: ", sampleAnswer)
console.assert(sampleAnswer === 4361, `Expected: ${4361} and received ${sampleAnswer}`)

const lines = fs.readFileSync('2023/day_3.txt', { encoding: 'utf-8' }).split('\n')
const part1Answer = solvePart1(lines)

console.log("Part 1 Answer: ", part1Answer)

console.assert(part1Answer === 540212, `Expected: ${540212} and received ${part1Answer}`)
console.assert(part1Answer !== 544426, `Did not expect: ${544426} and received ${part1Answer}`)
console.assert(part1Answer !== 513960, `Did not expect: ${513960} and received ${part1Answer}`)
console.assert(part1Answer !== 536262, `Did not expect: ${536262} and received ${part1Answer}`)
console.assert(part1Answer !== 601591, `Did not expect: ${601591} and received ${part1Answer}`)
console.assert(part1Answer !== 538510, `Did not expect: ${538510} and received ${part1Answer}`)
console.assert(part1Answer !== 323945, `Did not expect: ${323945} and received ${part1Answer}`)