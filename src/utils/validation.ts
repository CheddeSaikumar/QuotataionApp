export const isNonNegativeNumber = (value: number): boolean => {
  return !isNaN(value) && value >= 0;
};

export const validateNumberInput = (value: string): number => {
  const parsedValue = parseFloat(value);
  return isNonNegativeNumber(parsedValue) ? parsedValue : 0;
};