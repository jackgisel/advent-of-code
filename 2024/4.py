# Parse the grid into a dictionary of (y,x):c
data = open("2024/4.txt").readlines()
H, W = len(data), len(data[0]) - 1
grid = {(y, x): data[y][x] for y in range(H) for x in range(W)}

# Part 1 - Find anything that says 'XMAS'
TARGET = "XMAS"
DELTAS = [(dy, dx) for dy in [-1, 0, 1] for dx in [-1, 0, 1] if (dx != 0 or dy != 0)]
count = 0
for y, x in grid:
    for dy, dx in DELTAS:
        candidate = "".join(
            grid.get((y + dy * i, x + dx * i), "") for i in range(len(TARGET))
        )
        count += candidate == TARGET
print("Part 1:", count)

# Part 2 - Find an MAS 'X'...
count = 0
for y, x in grid:
    if grid[y, x] == "A":
        lr = grid.get((y - 1, x - 1), "") + grid.get((y + 1, x + 1), "")
        rl = grid.get((y - 1, x + 1), "") + grid.get((y + 1, x - 1), "")
        count += {lr, rl} <= {"MS", "SM"}
print("Part 2:", count)
