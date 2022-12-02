package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"math"
	"sort"
	"strconv"
	"strings"
)

func main() {
	content, err := ioutil.ReadFile("./2022/day1Input.txt")

	if err != nil {
		log.Fatal(err)
	}

	elfs := strings.Split(string(content), "\n\n")

	max := 0
	var counts []int

	for _, elf := range elfs {
		calories := strings.Split(string(elf), "\n")
		sum := 0
		for _, cal := range calories {
			i, err := strconv.Atoi(cal)
			if err != nil {
				panic(err)
			}
			sum = sum + int(i)
		}
		max = int(math.Max(float64(max), float64(sum)))
		counts = append(counts, sum)
	}
	sort.Ints(counts)
	fmt.Println(counts[len(counts) - 1])
	topThree := counts[len(counts) - 1] + counts[len(counts) - 2] + counts[len(counts) - 3] 
	fmt.Println(topThree)
}