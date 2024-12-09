const path = "./2024/4.txt";
const file = Bun.file(path);
const text = await file.text();

const scan = (lines: string[][], x: number, y: number): number => {
  let count = 0;

  const canLookRight = x + 4 <= lines[0].length;
  const canLookLeft = x - 4 >= 0;
  const canLookUp = y - 4 >= 0;
  const canLookDown = y + 4 <= lines.length;

  if (canLookRight) {
    if (lines[y].slice(x, x + 4).join("") === "XMAS") {
      count++;
      console.log(x, y);
    }

    if (canLookUp) {
      const arr = [];
      for (let i = 0; i < 4; i++) {
        arr.push(lines[y - i][x + i]);
      }
      if (arr.join("") === "XMAS") {
        count++;
        console.log(x, y, "UP RIGHT");
      }
    }
    if (canLookDown) {
      const arr = [];
      for (let i = 0; i < 4; i++) {
        arr.push(lines[y + i][x + i]);
      }
      if (arr.join("") === "XMAS") {
        count++;
        console.log(x, y);
      }
    }
  }

  if (canLookLeft) {
    if (lines[y].slice(x - 3, x + 1).join("") === "SAMX") {
      count++;
      console.log(x, y);
    }

    if (canLookUp) {
      const arr = [];
      for (let i = 0; i < 4; i++) {
        arr.push(lines[y - i][x - i]);
      }
      if (arr.join("") === "XMAS") {
        count++;
        console.log(x, y);
      }
    }
    if (canLookDown) {
      const arr = [];
      for (let i = 0; i < 4; i++) {
        arr.push(lines[y + i][x - i]);
      }
      if (arr.join("") === "XMAS") {
        count++;
        console.log(x, y);
      }
    }
  }

  if (canLookUp) {
    if (
      lines
        .slice(y - 3, y + 1)
        .map((line) => line[x])
        .join("") == "SAMX"
    ) {
      count++;
    }
  }

  if (canLookDown) {
    if (
      lines
        .slice(y, y + 4)
        .map((line) => line[x])
        .join("") == "XMAS"
    ) {
      count++;
    }
  }

  return count;
};

const solve = (input: string): number => {
  const lines: string[][] = input.split("\n").map((line) => line.split(""));
  let globalCount = 1;

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      const cursor = lines[y][x];

      if (cursor === "X") {
        const v = scan(lines, x, y);
        globalCount += v;
      }
    }
  }

  return globalCount;
};

console.log(solve(text));
