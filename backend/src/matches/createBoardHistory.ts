function isValidStep(step: string) {
  return /^[xo]:[0-8]$/.test(step);
}

function createRow(step: string, steps: string[] = Array(9).fill(null)) {
  const [player, idx] = step.split(":");
  if (!player || !idx) {
    return null;
  }
  if (steps[parseInt(idx)]) {
    throw new Error("invalid board state");
  }
  steps[parseInt(idx)] = player;
  return steps;
}

export function createBoardHistory(input?: string | null) {
  if (!input) return [];
  return input
    .split(",")
    .map((s) => s.toLowerCase().trim())
    .filter(isValidStep)
    .reduce((acc, step, index) => {
      let row: string[] | null = null;
      if (index === 0) {
        row = createRow(step);
      } else {
        const prevStep = acc[index - 1];
        if (prevStep) {
          row = createRow(step, [...prevStep]);
        }
      }
      if (row) {
        acc.push(row);
      }
      return acc;
    }, [] as string[][]);
}
