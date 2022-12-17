from collections import defaultdict


lines = open("2022/7.in").readlines()
size = defaultdict(int)
path = []

for line in lines:
    parts = line.strip().split()
    if parts[0] == "$":
        if parts[1] == "ls":
            continue
        if parts[1] == "cd":
            if parts[2] == "..":
                path.pop()
            else:
                path.append(parts[2])
    elif parts[0] == "dir":
        continue
    else:
        sz = int(parts[0])
        for i in range(1, len(path)+1):
            size["/".join(path[:i])] += sz

max_used = 70000000 - 30000000
total_used = size['/']
need_to_free = total_used - max_used

p1 = 0
p2 = 1e9

for k, v in size.items():
    if v <= 100000:
        p1 += v
    if v >= need_to_free:
        p2 = min(p2, v)

print(p1)
print(p2)