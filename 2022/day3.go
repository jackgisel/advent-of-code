package main

import (
	"bufio"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"strings"

	"github.com/thoas/go-funk"
)

func main() {
	chars := strings.Split("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", "")
	charToValue := make(map[string]int)

	for ind, char := range chars {
		charToValue[char] = ind + 1
	}

	file, err := os.Open("./2022/day3Input.txt")

    if err != nil {
        log.Fatal(err)
    }
    defer file.Close()

    scanner := bufio.NewScanner(file)
	var score int

	// part 1
    for scanner.Scan() {
        line := scanner.Text()
		first := line[:(len(line) / 2)]
		second := line[(len(line) / 2):]

		for _, char := range strings.Split(first, "") {
			if (funk.Contains(second, char)) {
				score += charToValue[char]
				break
			}
		}
    }

	if err := scanner.Err(); err != nil {
        log.Fatal(err)
    }

	fmt.Println(score)

	// part 2
	content, err := ioutil.ReadFile("./2022/day3Input.txt")
	var part2Score int

	if err != nil {
		log.Fatal(err)
	}

	lines := strings.Split(string(content), "\n")

	for i := 0; i < len(lines); i += 3 {
		first := lines[i]
		second := lines[i+1]
		third := lines[i+2]

		for _, char := range strings.Split(first, "") {
			if (funk.Contains(second, char) && funk.Contains(third, char)) {
				part2Score += charToValue[char]
				break
			}
		}
	}
	
	fmt.Println(part2Score)
}