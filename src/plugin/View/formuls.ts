export function calculateToPercents(options: {
  valueInPixels: number;
  pathElement: HTMLElement;
  isVertical: boolean;
}) {
  const { valueInPixels, pathElement, isVertical } = options;
  const lengthInPixels: number = isVertical
    ? pathElement.getBoundingClientRect().height
    : pathElement.getBoundingClientRect().width;
  const valueInPercents = (valueInPixels * 100) / lengthInPixels;
  return valueInPercents;
}

export function calculateToPixels(options: {
  valueInPercents: number;
  pathElement: HTMLElement;
  isVertical: boolean;
}) {
  const { valueInPercents, pathElement, isVertical } = options;
  const lengthInPixels: number = isVertical
    ? pathElement.getBoundingClientRect().height
    : pathElement.getBoundingClientRect().width;
  const valueInPixels = (valueInPercents / 100) * lengthInPixels;
  return valueInPixels;
}

export function calculateValueToPercents(
  positionValue: number,
  min: number,
  max: number,
): number {
  return ((positionValue - min) * 100) / (max - min);
}

export const calculateNumbersOnScale = (
  numberOfStrokes: number,
  min: number,
  max: number,
) => [...Array(numberOfStrokes)].map((i, id) => Math.floor(((max - min)
 / (numberOfStrokes - 1)) * id + min));

export const calculateValueWithStep = (
  value: number,
  min: number,
  step: number,
): number => Math.round((value - min) / step) * step + min;
