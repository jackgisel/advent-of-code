const fs = require('fs')

function isDigit(char) {
    return /[0-9]/.test(char)
}

function isSymbol(char) {
    return !("1234567890.".includes(char))
}

const solvePart1 = (lines) => {
    let sum = 0

    lines.forEach((line, lineIndex) => {
        let currentNumber = ""
        line.split("").forEach((x, xIndex) => {
            // In a number
            if (isDigit(x)) {
                currentNumber += x
            }

            // End of number
            if (currentNumber && !isDigit(x)) {
                // Check if touching a symbol
                let touchingSymbol = false

                for (let y = lineIndex - 1; y <= lineIndex + 1; y++) {
                    if (touchingSymbol) break
                    if (y > -1 && y < lines.length) {
                        for (let iX = xIndex - 1 - currentNumber.length; iX <= xIndex + 1 + currentNumber.length; iX++) {
                            if (iX > -1 && iX < x.length) {
                                console.log(lines[y][iX], isSymbol(lines[y][iX]))
                                touchingSymbol = isSymbol(lines[y][iX])
                                if (touchingSymbol) break
                            }
                        }
                    }
                }

                if (touchingSymbol) {
                    sum += Number(currentNumber)
                }

                // Clear
                currentNumber = ""
            }
        })
    })

    return sum
}

// Test cases
const sampleLines = fs.readFileSync('2023/day_3_sample.txt', { encoding: 'utf-8' }).split('\n')
const sampleAnswer = solvePart1(sampleLines)
console.log("Sample Answer: ", sampleAnswer)
console.assert(sampleAnswer === 4361, `Expected: ${4361} and received ${sampleAnswer}`)