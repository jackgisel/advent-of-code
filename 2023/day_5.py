with open("2023/day_5.txt") as f:
    lines = f.read().strip().split("\n")

seeds = list(map(int, lines[0].split(" ")[1:]))
maps = []

i = 2
while i < len(lines):
    maps.append([])
    i += 1
    while i < len(lines) and not lines[i] == "":
        dest_start, source_start, range_len = map(int, lines[i].split())
        maps[-1].append((dest_start, source_start, range_len))
        i += 1
    i += 1

def find_location(seed: int):
    current_number = seed
    for m in maps:
        for dest_start, source_start, range_len in m:
            if source_start <= current_number < source_start + range_len:
                current_number = dest_start + (current_number - source_start)
                break
    return current_number


answers = [find_location(seed) for seed in seeds]
print(min(answers))

# PART 2
import re

with open("2023/day_5.txt") as fin:
    lines = fin.read().strip().split("\n")

raw_seeds = list(map(int, lines[0].split(" ")[1:]))
seeds = [
    (raw_seeds[i], raw_seeds[i+1])
    for i in range(0, len(raw_seeds), 2)
]

# Generate all the mappings
maps = []

i = 2
while i < len(lines):
    catA, _, catB = lines[i].split(" ")[0].split("-")
    maps.append([])

    i += 1
    while i < len(lines) and not lines[i] == "":
        dstStart, srcStart, rangeLen = map(int, lines[i].split())
        maps[-1].append((dstStart, srcStart, rangeLen))
        i += 1

    maps[-1].sort(key=lambda x: x[1])

    i += 1


# Ensure that all mappings are disjoint
for m in maps:
    for i in range(len(m)-1):
        if not m[i][1] + m[i][2] <= m[i+1][1]:
            print(m[i], m[i+1])


def remap(lo, hi, m):
    # Remap an interval (lo,hi) to a set of intervals m
    ans = []
    for dst, src, R in m:
        end = src + R - 1
        D = dst - src  # How much is this range shifted

        if not (end < lo or src > hi):
            ans.append((max(src, lo), min(end, hi), D))

    for i, interval in enumerate(ans):
        l, r, D = interval
        yield (l + D, r + D)

        if i < len(ans) - 1 and ans[i+1][0] > r + 1:
            yield (r + 1, ans[i+1][0] - 1)

    # End and start ranges can use some love
    if len(ans) == 0:
        yield (lo, hi)
        return

    if ans[0][0] != lo:
        yield (lo, ans[0][0] - 1)
    if ans[-1][1] != hi:
        yield (ans[-1][1] + 1, hi)


locs = []

ans = 1 << 60

for start, R in seeds:
    cur_intervals = [(start, start + R - 1)]
    new_intervals = []

    for m in maps:
        for lo, hi in cur_intervals:
            for new_interval in remap(lo, hi, m):
                new_intervals.append(new_interval)

        cur_intervals, new_intervals = new_intervals, []

    for lo, hi in cur_intervals:
        ans = min(ans, lo)


print(ans)