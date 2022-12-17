MARKER_LENGTH = 14

def main():
    f = open('./2022/day6input.txt', 'r')
    lines = f.readlines()

    for line in lines:
        for i in range(len(line) - MARKER_LENGTH):
            substring = line[i:i+MARKER_LENGTH]

            if len(set(substring)) == MARKER_LENGTH:
                print(substring)
                print(i+MARKER_LENGTH)
                break

    return

if __name__ == "__main__":
    main()
