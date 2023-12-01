const fs = require('fs')

const data = fs.readFileSync('2023/day_1.txt', { encoding: 'utf-8' })

const lines = data.split('\n')

const words = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

function getFirstNumber(chars, reverse) {
    let number;
    for (let i = 0; i < chars.length; i++) {
        const char = chars[i]

        const previousChars = reverse ? chars.slice(0, i).reverse().join('') : chars.slice(0, i).join('')

        for (let word of words) {
            if (previousChars.includes(word)) {
                number = words.indexOf(word) + 1
                break
            }
        }

        if (number) {
            break
        }

        let n = parseInt(char)

        if (n) {
            number = n
            break
        }
    }
    return number
}

let sum = 0
lines.forEach((line) => {
    const chars = line.split('')

    let firstNumber = getFirstNumber(chars, false)
    let lastNumber = getFirstNumber(chars.reverse(), true)

    sum += parseInt(`${firstNumber}${lastNumber}`)
})

console.log(sum)