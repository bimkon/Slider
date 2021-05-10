export function calculateToPercents(options: {
  valueInPixels: number;
  pathElement: HTMLElement,
  isVertical: boolean,
}) {
  const { valueInPixels, pathElement, isVertical } = options;
  const lengthInPixels: number = isVertical ? pathElement.getBoundingClientRect().height
    : pathElement.getBoundingClientRect().width;
  const valueInPercents = (valueInPixels * 100) / lengthInPixels;
  return valueInPercents;
}

export function calculateToPixels(options: {
  valueInPercents: number,
  pathElement: HTMLElement,
  isVertical:boolean,
}) {
  const { valueInPercents, pathElement, isVertical } = options;
  const lengthInPixels: number = isVertical ? pathElement.getBoundingClientRect().height
    : pathElement.getBoundingClientRect().width;
  const valueInPixels = (valueInPercents / 100) * lengthInPixels;
  return valueInPixels;
}

export function calculateValueToPercents(positionValue: number, min: number, max: number): number {
  return ((positionValue - min) * 100) / (max - min);
}
