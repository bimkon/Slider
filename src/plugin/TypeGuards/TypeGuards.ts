export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

export const isNumber = (value: unknown): number | null => {
  const parsedValue = parseFloat(`${value}`);
  const isValueNaN = Number.isNaN(parsedValue);
  return !isValueNaN ? parsedValue : null;
};
