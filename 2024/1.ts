import fs from "fs";

function solve(first: number[], second: number[]) {
  const sortedFirst = first.sort();
  const sortedSecond = second.sort();

  let sum = 0;
  sortedFirst.forEach((locationId, index) => {
    sum += Math.abs(locationId - sortedSecond[index]);
  });

  return sum;
}

function parse() {
  fs.readFile("1.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const left: number[] = [];
    const right: number[] = [];

    data.split("\n").forEach((line) => {
      const [l, r] = line.split("   ");
      left.push(parseInt(l));
      right.push(parseInt(r));
    });
    console.log(solve(left, right));
  });
}

const result = parse();
