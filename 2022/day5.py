buckets = {
    1: ["J", "H",  "P", "M", "S", "F", "N", "V"],
	2: ["S", "R", "L", "M", "J", "D", "Q"],
	3: ["N", "Q", "D", "H", "C", "S", "W", "B"],
	4: ["R" ,"S" ,"C" ,"L"],
	5: ["M","V","T","P","F","B"],
	6: ["T","R","Q","N","C"],
	7: ["G","V","R"],
	8: ["C", "Z", "S", "P", "D", "L", "R"],
	9: ["D","S","J","V","G","P","B","F"],
}

def main():
    f = open('./2022/day5input.txt', 'r')
    lines = f.readlines()

    for line in lines:
        input = line.strip().split(" from ")
        move = input[0].split("move ")[1]
        start, end = input[1].split(" to ")
        move, start, end = int(move), int(start), int(end)

        moving = list(reversed(buckets[start][((len(buckets[start])) - move):]))
        # part 2
        # moving = buckets[start][((len(buckets[start])) - move):]
        buckets[end].extend(moving)
        buckets[start] = buckets[start][:((len(buckets[start])) - move)]
        
    print("".join([
        buckets[bucket][-1]
        for bucket in buckets
    ]))
    return

if __name__ == "__main__":
    main()
