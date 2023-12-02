const fs = require('fs')
const data = fs.readFileSync('2023/day_2.txt', { encoding: 'utf-8' })
const lines = data.split('\n')

function solvePart1(lines) {
    const gameAllowance = {
        'red': 12,
        'green': 13,
        'blue': 14
    }
    const playableGameIds = []

    for (let line of lines) {
        const lineParts = line.split(':')
        const gameId = Number(lineParts[0].split(' ')[1])
        const sets = lineParts[1].split(';')

        const formattedSets = sets.map(set => {
            return set.split(',').map(x => x.trim()).reduce((acc, cur) => {
                const parts = cur.split(' ')
                const numbers = parseInt(parts[0])
                const color = parts[1]
                return {
                    ...acc,
                    [color]: numbers
                }
            }, {})
        })

        const gameMaxes = formattedSets.reduce((acc, cur) => {
            for (let key in cur) {
                if (key in acc) {
                    acc[key] = Math.max(acc[key], cur[key])
                } else {
                    acc[key] = cur[key]
                }
            }
            return acc;
        }, {})

        const canPlayWithAllowance = Object.keys(gameAllowance).every(key => {
            if (gameMaxes[key] > gameAllowance[key]) {
                return false
            }
            return true
        })

        if (canPlayWithAllowance) {
            playableGameIds.push(gameId)
        }
    }

    return playableGameIds.reduce((a, b) => a + b, 0)
}

console.log(solvePart1(lines))


function solvePart2(lines) {
    return lines.reduce((acc, line) => {
        const lineParts = line.split(':')
        const sets = lineParts[1].split(';')

        const formattedSets = sets.map(set => {
            return set.split(',').map(x => x.trim()).reduce((acc, cur) => {
                const parts = cur.split(' ')
                const numbers = parseInt(parts[0])
                const color = parts[1]
                return {
                    ...acc,
                    [color]: numbers
                }
            }, {})
        })

        const gameMaxes = formattedSets.reduce((acc, cur) => {
            for (let key in cur) {
                if (key in acc) {
                    acc[key] = Math.max(acc[key], cur[key])
                } else {
                    acc[key] = cur[key]
                }
            }
            return acc;
        }, {})

        const power = Object.keys(gameMaxes).reduce((acc, cur) => {
            return acc * gameMaxes[cur]
        }, 1)

        return acc += power
    }, 0)
}

console.log(solvePart2(lines))