const path = "./2024/3.txt";
const file = Bun.file(path);
const text = await file.text();

const mulRegex = /mul\((\d+),(\d+)\)/g;
const doRegex = /do\(\)/g;
const dontRegex = /don't\(\)/g;

let nSum = 0;
let isEnabled = true; // By default, `mul` instructions are enabled

// Use matchAll to find all occurrences of the relevant patterns
const instructions = Array.from(
  text.matchAll(/mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g)
);

for (const instruction of instructions) {
  const [fullMatch] = instruction;

  if (fullMatch.startsWith("mul")) {
    if (isEnabled) {
      const [, num1, num2] = instruction;
      nSum += parseInt(num1) * parseInt(num2);
    }
  } else if (fullMatch === "do()") {
    isEnabled = true;
  } else if (fullMatch === "don't()") {
    isEnabled = false;
  }
}

console.log(nSum);
