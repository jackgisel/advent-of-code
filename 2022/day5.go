package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"

	"github.com/thoas/go-funk"
)

func main() {
	s := make(map[int][]string)
	s[1] = []string{"J", "H",  "P", "M", "S", "F", "N", "V"}
	s[2] = []string{"S", "R", "L", "M", "J", "D", "Q"}
	s[3] = []string{"N", "Q", "D", "H", "C", "S", "W", "B"}
	s[4] = []string{"R" ,"S" ,"C" ,"L"}
	s[5] = []string{"M","V","T","P","F","B"}
	s[6] = []string{"T","R","Q","N","C"}
	s[7] = []string{"G","V","R"}
	s[8] = []string{"C", "Z", "S", "P", "D", "L", "R"}
	s[9] = []string{"D","S","J","V","G","P","B","F"}

	fmt.Println("START:\t", s[1][len(s[1]) - 1], s[2][len(s[2]) - 1], s[3][len(s[3]) - 1], s[4][len(s[4]) - 1], s[5][len(s[5]) - 1], s[6][len(s[6]) - 1], s[7][len(s[7]) - 1], s[8][len(s[8]) - 1], s[9][len(s[9]) - 1])
	
	file, err := os.Open("./2022/day5Input.txt")

    if err != nil {
        log.Fatal(err)
    }
    defer file.Close()

    scanner := bufio.NewScanner(file)

	// part 1
    for scanner.Scan() {
		line := scanner.Text()
		input := strings.Split(line, " from ")
		fmt.Println(input)
		move, _ := strconv.Atoi(strings.Split(input[0], "move")[1])
		locations := strings.Split(input[1], " to ")
		start, _ := strconv.Atoi(locations[0])
		end, _ := strconv.Atoi(locations[1])
		
		
		movingElements := s[start][:len(s[start]) - move - 1]
		s[start] = s[start][0:len(s[start]) - move - 1]
		reversedStack := funk.Reverse(movingElements)
		s[end] = append(s[end], reversedStack...)
	}

	if err := scanner.Err(); err != nil {
        log.Fatal(err)
    }

	fmt.Println("END:\t", s[1][len(s[1]) - 1], s[2][len(s[2]) - 1], s[3][len(s[3]) - 1], s[4][len(s[4]) - 1], s[5][len(s[5]) - 1], s[6][len(s[6]) - 1], s[7][len(s[7]) - 1], s[8][len(s[8]) - 1], s[9][len(s[9]) - 1])
}