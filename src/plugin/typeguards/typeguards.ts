export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

export const isNumber = (value: unknown): value is number => typeof value === 'number' && !Number.isNaN(value) && value >= 0;
