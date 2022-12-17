package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

type Stack []string

// IsEmpty: check if stack is empty
func (s *Stack) IsEmpty() bool {
	return len(*s) == 0
}

// Push a new value onto the stack
func (s *Stack) Push(str string) {
	*s = append(*s, str) // Simply append the new value to the end of the stack
}

// Remove and return top element of stack. Return false if stack is empty.
func (s *Stack) Pop() (string, bool) {
	if s.IsEmpty() {
		return "", false
	} else {
		index := len(*s) - 1 // Get the index of the top most element.
		element := (*s)[index] // Index into the slice and obtain the element.
		*s = (*s)[:index] // Remove it from the stack by slicing it off.
		return element, true
	}
}

func main() {
	var directoryStack Stack
	directoryMap := make(map[string][]string)
	directorySizes := make(map[string]int) 

	file, err := os.Open("./2022/day7Input.txt")

    if err != nil {
        log.Fatal(err)
    }
    defer file.Close()
	scanner := bufio.NewScanner(file)

	var currentDirectory string

	for scanner.Scan() {
		line := scanner.Text()
		lineParts := strings.Split(line, " ")
		
		if lineParts[0] == "$" {
			if lineParts[1] == "ls" {
				continue
			} else {
				if lineParts[2] == ".." {
					previousDirectory, _ := directoryStack.Pop()
					currentDirectory = previousDirectory
				} else {
					directoryStack.Push(lineParts[2])
					currentDirectory = lineParts[2]
					directoryMap[currentDirectory] = append(directoryMap[currentDirectory])
					directorySizes[currentDirectory] = 0
				}
			}
		} else if lineParts[0] == "dir" {
			fmt.Println(lineParts[1])
			directoryMap[currentDirectory] = append(directoryMap[currentDirectory], lineParts[1])
		} else {
			val, _ := strconv.Atoi(lineParts[0])
			directorySizes[currentDirectory] += val
		}
	}

	if err := scanner.Err(); err != nil {
        log.Fatal(err)
    }

	for _, directory := range directoryMap {
		fmt.Println(directory)
	}

	fmt.Println(directoryMap)
	fmt.Println(directorySizes)
	
}