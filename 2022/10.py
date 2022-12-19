f = open("2022/10.in", "r").readlines()
lines = [l.strip().split() for l in f]

class CPU:
    X = 1
    cycle = 0
    history = {0: 0}
    crt = ""
    grid = [x for x in '.'*240]

    def __init__(self) -> None:
        pass

    def process(self, cmd: str, body: dict) -> int:
        self.cycle_cpu()

        if cmd == "noop":
            pass
        else:
            _, amount = body
            self.cycle_cpu()
            self.X += int(amount)

        return self.X, self.cycle

    def cycle_cpu(self):
        self.cycle += 1
        self.history[self.cycle] = self.X

    def get_X(self, i: int) -> int:
        return self.history.get(i)

    def print_crt(self) -> None:
        for cycle, position in self.history.items():
            cycle -= 1
            mod = 40*(cycle//40)
            position = position + mod

            if cycle in range(position-1, position+2):
                self.grid[cycle] = "#"

        for i in range(0,240,40):
            print(' '.join(self.grid[i:i+40]))


cpu = CPU()

total = 0

for l in lines:
    cmd = l[0]
    x, cycle = cpu.process(cmd, l)
    
for cycle in [20, 60, 100, 140, 180, 220]:
    total += cycle * cpu.get_X(cycle)

print(total)
cpu.print_crt()

