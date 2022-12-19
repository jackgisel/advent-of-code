def print_matrix(tail_set: set):
    m = []
    y_max = 0
    y_min = 1e9
    x_max = 0
    x_min = 1e9
    for val in tail_set:
        x, y = val
        y_max = max(y, y_max)
        y_min = min(y, y_min)
        x_max = max(x, x_max)
        x_min = min(x, x_min)

    for i in range(y_min, y_max):
        l = ""
        for j in range(x_min, x_max):
            if (j, i) in tail_set:
                l += "#"
            else:
                l += "."
        m.append(l)
    str =""
    for l in reversed(m):
        str += l + "\n"

    open("out.txt", "w").write(str)
    print(str)

def part1():
    f = open("2022/9.ex", "r").readlines()
    lines = [l.strip().split() for l in f]
    tail_set = set()
    head = [0,0]
    tail = [0,0]
    for cmds in lines:
        direction = cmds[0]
        distance = int(cmds[1])
        
        for i in range(distance):
            # move head
            if direction == "R":
                head[0] += 1
            elif direction == "L":
                head[0] -= 1
            elif direction == "U":
                head[1] += 1
            elif direction == "D":
                head[1] -= 1


            # follow with tail
            x_dif = head[0] - tail[0]
            y_dif = head[1] - tail[1]

            if x_dif == 2 and y_dif == 1:
                tail[1] += 1
                tail[0] += 1
            elif x_dif == 1 and y_dif == 2:
                tail[1] += 1
                tail[0] += 1
            elif x_dif == -2 and y_dif == -1:
                tail[1] -= 1
                tail[0] -= 1
            elif x_dif == -1 and y_dif == -2:
                tail[1] -= 1
                tail[0] -= 1
            elif x_dif == -2 and y_dif == 1:
                tail[1] += 1
                tail[0] -= 1
            elif x_dif == 2 and y_dif == -1:
                tail[1] -= 1
                tail[0] += 1
            elif x_dif == -1 and y_dif == 2:
                tail[1] += 1
                tail[0] -= 1
            elif x_dif == 1 and y_dif == -2:
                tail[1] -= 1
                tail[0] += 1
            elif x_dif == 2:
                tail[0] += 1
            elif x_dif == -2:
                tail[0] -= 1
            elif y_dif == 2:
                tail[1] += 1
            elif y_dif == -2:
                tail[1] -= 1
            
            tail_set.add((tail[0], tail[1]))
            
    print(len(tail_set))



def part2():
    f = open("2022/9.in", "r").readlines()
    lines = [l.strip().split() for l in f]
    tail_set = set()
    head = [0,0]
    tails = [
        [0,0]
        for i in range(9)
    ]
    for cmds in lines:
        direction = cmds[0]
        distance = int(cmds[1])
        
        for i in range(distance):
            # move head
            if direction == "R":
                head[0] += 1
            elif direction == "L":
                head[0] -= 1
            elif direction == "U":
                head[1] += 1
            elif direction == "D":
                head[1] -= 1


            for index, tail in enumerate(tails):
                prev = head if index == 0 else tails[index - 1]
                # follow with tail
                x_dif = prev[0] - tail[0]
                y_dif = prev[1] - tail[1]

                if x_dif == 2 and y_dif == 1:
                    tail[1] += 1
                    tail[0] += 1
                elif x_dif == 1 and y_dif == 2:
                    tail[1] += 1
                    tail[0] += 1
                elif x_dif == -2 and y_dif == -1:
                    tail[1] -= 1
                    tail[0] -= 1
                elif x_dif == -1 and y_dif == -2:
                    tail[1] -= 1
                    tail[0] -= 1
                elif x_dif == -2 and y_dif == 1:
                    tail[1] += 1
                    tail[0] -= 1
                elif x_dif == 2 and y_dif == -1:
                    tail[1] -= 1
                    tail[0] += 1
                elif x_dif == -1 and y_dif == 2:
                    tail[1] += 1
                    tail[0] -= 1
                elif x_dif == 1 and y_dif == -2:
                    tail[1] -= 1
                    tail[0] += 1
                elif x_dif == 2:
                    tail[0] += 1
                elif x_dif == -2:
                    tail[0] -= 1
                elif y_dif == 2:
                    tail[1] += 1
                elif y_dif == -2:
                    tail[1] -= 1
                
                if index == 8:
                    tail_set.add((tail[0], tail[1]))
            
    print(len(tail_set))
    print_matrix(tail_set)


if __name__ == "__main__":
    part2()