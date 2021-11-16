import SliderOptions from '../SliderOptions';

export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

export const isNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);

export const isNormalized = (values: any): values is SliderOptions => typeof values.isRange === 'boolean' && typeof values.min === 'number' && typeof values.max === 'number' && typeof values.step === 'number' && typeof values.isVertical === 'boolean' && typeof values.from === 'number' && typeof values.to === 'number' && typeof values.hasTip === 'boolean' && typeof values.numberOfStrokes === 'number';
