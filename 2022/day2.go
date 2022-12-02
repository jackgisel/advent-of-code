package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"strings"
)

// A Rock (1)
// B Paper (2)
// C Scissors (3)

// X Rock (1) W: 3 L: 2
// Y Paper (2) W: 1 L: 3
// Z Scissors (3) W: 2 L: 1

func nextInt(num int) int {
	newNum := num + 1
	if (newNum == 4) {
		newNum = 1
	}
	return newNum
}

func previousInt(num int) int {
	newNum := num - 1
	if (newNum == 0) {
		newNum = 3
	}
	return newNum
}

func main() {
	content, err := ioutil.ReadFile("./2022/day2Input.txt")

	if err != nil {
		log.Fatal(err)
	}

	rounds := strings.Split(string(content), "\n")
	score := 0
	pointsPerPlay := map[string]int {
		"A": 1,
		"B": 2,
		"C": 3,
		"X": 1,
		"Y": 2,
		"Z": 3,
	}

	// pt 1
	for _, round := range rounds {
		plays := strings.Split(string(round), " ")
		oppScore := pointsPerPlay[plays[0]]
		myScore := pointsPerPlay[plays[1]]
		netScore := myScore - oppScore
		var outcome int
		
		if (netScore == 0) {
			outcome = 3
		} else if (previousInt(myScore) == oppScore){
			outcome = 6
		} else {
			outcome = 0
		}

		score += myScore + outcome
	}

	fmt.Println(score)

	// pt 2
	pt2Score := 0
	for _, round := range rounds {
		plays := strings.Split(string(round), " ")
		oppScore := pointsPerPlay[plays[0]]
		var outcome int

		if (plays[1] == string('Y')) {
			outcome = oppScore + 3
		} else if (plays[1] == string('X')) {
			outcome = previousInt(oppScore)
		} else if (plays[1] == string('Z')) {
			outcome = nextInt(oppScore) + 6
		}

		pt2Score += outcome
	}

	fmt.Println(pt2Score)
}