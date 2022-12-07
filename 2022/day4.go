package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func main() {
	file, err := os.Open("./2022/day4Input.txt")

    if err != nil {
        log.Fatal(err)
    }
    defer file.Close()

    scanner := bufio.NewScanner(file)
	var numberOfFullContains int
	var numberOfOverlaps int

	// part 1
    for scanner.Scan() {
        line := scanner.Text()
		parts := strings.Split(line, ",")
		first := strings.Split(parts[0], "-")
		f1, _ := strconv.Atoi(first[0])
		f2, _ := strconv.Atoi(first[1])
		second := strings.Split(parts[1], "-")
		s1, _ := strconv.Atoi(second[0])
		s2, _ := strconv.Atoi(second[1])

		if (f1 >= s1 && f1 <= s2 && f2 <= s2){
			numberOfFullContains ++
		} else if (s1 >= f1 && s1 <= f2 && s2 <= f2) {
			numberOfFullContains ++
		}

		if (f1 >= s1 && f1 <= s2){
			numberOfOverlaps ++
		} else if (s1 >= f1 && s1 <= f2) {
			numberOfOverlaps ++
		}
    }

	if err := scanner.Err(); err != nil {
        log.Fatal(err)
    }

	fmt.Println(numberOfFullContains)
	fmt.Println(numberOfOverlaps)
}