const path = "./2024/3.txt";
const file = Bun.file(path);
const text = await file.text();

const regex = /mul\((\d+),(\d+)\)/g;
const matches = text.matchAll(regex);

let nSum = 0;
for (const match of matches) {
  nSum += parseInt(match[1]) * parseInt(match[2]);
}

console.log(nSum);
