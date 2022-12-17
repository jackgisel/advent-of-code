def check(tree: int, others: str):
    return not any([
        tree <= int(ch)
        for ch in others
    ])

def part1():
    lines = open("2022/8.in", "r").readlines()

    trees_visible = 0

    for line_index, non_stripped_line in enumerate(lines):
        line = non_stripped_line.strip()
        top_or_bottom = line_index == 0 or line_index == len(lines) - 1

        for char_index, char in enumerate(line):
            left_or_right = char_index == 0 or char_index == len(line) - 1
                
            if top_or_bottom or left_or_right:
                trees_visible += 1
            else:
                current_tree_size = int(char)

                trees_left = line[:char_index]
                tress_right = line[char_index+1:]
                trees_down = "".join([
                    ln.strip()[char_index]
                    for ln in lines[line_index+1:len(non_stripped_line)-1]
                ])
                trees_up = "".join([
                    ln.strip()[char_index]
                    for ln in lines[0:line_index]
                ])

                if any([
                    check(current_tree_size, trees_left),
                    check(current_tree_size, tress_right),
                    check(current_tree_size, trees_down),
                    check(current_tree_size, trees_up)
                ]):
                    trees_visible += 1

    print(trees_visible)


def get_score(tree: int, others: str):
    score = 0
    if others != "":
        for index, ch in enumerate(others):
            next_tree = int(ch)
            score += 1
            if tree <= next_tree:
                return score
    return score



def part2():
    lines = open("2022/8.in", "r").readlines()

    max_view = 0

    for line_index, non_stripped_line in enumerate(lines):
        line = non_stripped_line.strip()

        top_or_bottom = line_index == 0 or line_index == len(lines) - 1

        for char_index, char in enumerate(line):

            left_or_right = char_index == 0 or char_index == len(line) - 1
                
            if top_or_bottom or left_or_right:
                pass
            else:
                current_tree_size = int(char)

                trees_left = line[:char_index][::-1]
                tress_right = line[char_index+1:]
                trees_down = "".join([
                    ln.strip()[char_index]
                    for ln in lines[line_index+1:len(line)]
                ])
                trees_up = "".join([
                    ln.strip()[char_index]
                    for ln in lines[0:line_index]
                ])[::-1]

                score = (
                    get_score(current_tree_size, trees_left)
                    * get_score(current_tree_size, tress_right)
                    * get_score(current_tree_size, trees_down)
                    * get_score(current_tree_size, trees_up)
                )

                max_view = max(max_view, score)
    
    print(max_view)
            


def main():
    print("Part 1: ")
    part1()

    print("Part 2: ")
    part2()
    
    
def test():
    lines = open("2022/8.in", "r").readlines()

    line_index = 3
    char_index = 2

    line = lines[line_index].strip()
    char = line[char_index]
    current_tree_size = int(char)

    trees_left = line[:char_index][::-1]
    tress_right = line[char_index+1:]
    trees_down = "".join([
        ln.strip()[char_index]
        for ln in lines[line_index+1:len(line)]
    ])
    trees_up = "".join([
        ln.strip()[char_index]
        for ln in lines[0:line_index]
    ])[::-1]
    
    assert get_score(current_tree_size, trees_left) == 2
    assert get_score(current_tree_size, tress_right) == 2
    assert get_score(current_tree_size, trees_down) == 1
    assert get_score(current_tree_size, trees_up) == 2

if __name__ == "__main__":
    main()
    # test()