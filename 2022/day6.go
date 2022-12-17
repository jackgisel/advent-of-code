package main

import (
	"io/ioutil"
	"log"
)

func unique(arr string) bool {
    m := make(map[rune]bool)
    for _, i := range arr {
        _, ok := m[i]
        if ok {
            return false
        }

        m[i] = true
    }

    return true
}

func main() {
	content, err := ioutil.ReadFile("./2022/day6input.txt")
	MARKEK_LEN := 12
	input := string(content)

	if err != nil {
		log.Fatal(err)
	}

	for i := 0; i < len(input) - MARKEK_LEN; i++ {
		if (unique(string(input[i:i+MARKEK_LEN]))) {
			print(i+MARKEK_LEN)
			break
		}
	}
}