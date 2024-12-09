const path = "./2024/4.txt";
const file = Bun.file(path);
const text = await file.text();

const solve = (input: string): number => {
  const lines: String[][] = input.split("\n").map((line) => line.split(""));
  let globalCount = 0;

  const scan = (x: number, y: number): number => {
    let count = 0;

    const canLookRight = x + 4 <= lines[0].length;
    const canLookLeft = x - 4 >= 0;
    const canLookUp = y - 4 >= 0;
    const canLookDown = y + 4 <= lines.length;

    if (canLookRight) {
      if (lines[y].slice(x, x + 4).join("") === "XMAS") count++;

      if (canLookUp) {
        const arr = [];
        for (let i = 0; i < 4; i++) {
          arr.push(lines[y - i][x + i]);
        }
        if (arr.join("") === "XMAS") count++;
      }
      if (canLookDown) {
        const arr = [];
        for (let i = 0; i < 4; i++) {
          arr.push(lines[y + i][x + i]);
        }
        if (arr.join("") === "XMAS") count++;
      }
    }

    if (canLookLeft) {
      if (lines[y].slice(x - 4, x).join("") === "SAMX") count++;

      if (canLookUp) {
        const arr = [];
        for (let i = 0; i < 4; i++) {
          arr.push(lines[y - i][x - i]);
        }
        if (arr.join("") === "SAMX") count++;
      }
      if (canLookDown) {
        const arr = [];
        for (let i = 0; i < 4; i++) {
          arr.push(lines[y + i][x - i]);
        }
        if (arr.join("") === "SAMX") count++;
      }
    }

    if (canLookUp) {
      if (
        lines
          .slice(y - 4, y)
          .map((line) => line[x])
          .join("") == "SAMX"
      )
        count++;
    }

    if (canLookDown) {
      if (
        lines
          .slice(y, y + 4)
          .map((line) => line[x])
          .join("") == "XMAS"
      )
        count++;
    }

    return count;
  };

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      const cursor = lines[y][x];

      if (cursor === "X") {
        globalCount += scan(x, y);
      }
    }
  }

  return globalCount;
};

console.log(solve(text));
