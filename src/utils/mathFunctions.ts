
export const mathFunctions = {
  sum: (values: number[]) => values.reduce((acc, val) => acc + val, 0),
  average: (values: number[]) => values.reduce((acc, val) => acc + val, 0) / values.length,
  min: (values: number[]) => Math.min(...values),
  max: (values: number[]) => Math.max(...values),
  median: (values: number[]) => {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  },
  standardDeviation: (values: number[]) => {
    const avg = mathFunctions.average(values);
    const squareDiffs = values.map(value => Math.pow(value - avg, 2));
    const avgSquareDiff = mathFunctions.average(squareDiffs);
    return Math.sqrt(avgSquareDiff);
  },
  percentage: (value: number, total: number) => (value / total) * 100,
  range: (values: number[]) => mathFunctions.max(values) - mathFunctions.min(values)
};

export const applyMathFunction = (
  functionName: keyof typeof mathFunctions,
  values: number[],
  additionalParams?: any
): number => {
  if (functionName === 'percentage' && additionalParams?.total) {
    return mathFunctions.percentage(values[0], additionalParams.total);
  }
  return mathFunctions[functionName](values);
};

export const formatCalculationResult = (result: number, decimals: number = 2): string => {
  return Number(result).toFixed(decimals);
};
