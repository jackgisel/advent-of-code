const path = "./2024/2.txt";
const file = Bun.file(path);
const text = await file.text();

function isSafe(line: string) {
  let safe = false;
  let ascending = false;

  const chars = line.split(" ");

  for (let i = 0; i <= chars.length - 2; i++) {
    const left = parseInt(chars[i]);
    const right = parseInt(chars[i + 1]);

    // Ceck initial order
    if (i === 0) {
      if (left > right) {
        ascending = false;
      } else if (left < right) {
        ascending = true;
      }
    } else {
      if ((!ascending && left < right) || (ascending && left > right)) {
        safe = false;
        break;
      }
    }

    const diff = Math.abs(left - right);

    if (diff < 1 || diff > 3) {
      safe = false;
      break;
    }

    if (i === chars.length - 2) {
      safe = true;
      console.log(line);
    }
  }

  return safe;
}

const safeReports = text.split("\n").reduce((sum, line) => {
  let safe = isSafe(line);

  if (!safe) {
    const chars = line.split(" ");
    chars.forEach((_, index) => {
      const listWithoutCurrent = chars.filter((_, i) => i !== index);

      safe = safe ? true : isSafe(listWithoutCurrent.join(" "));
    });
  }

  return safe ? sum + 1 : sum;
}, 0);

console.log(safeReports);
