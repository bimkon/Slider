/* eslint-disable no-param-reassign */
import {
  calculateValueToPercents,
  calculateNumbersOnScale,
  calculateValueWithStep,
} from '../formulas';

class Scale {
  scale: HTMLElement = document.createElement('div');

  scaleValue: HTMLElement | null = null;

  private arrayOfElements: Array<HTMLElement> = [];

  arrayOfNewElements: Array<HTMLElement> = [];

  numberOfStrokes: number;

  constructor(numberOfStrokes: number) {
    this.createTemplate(numberOfStrokes);
    this.numberOfStrokes = numberOfStrokes;
  }

  updateNumberOnScale(
    min: number,
    max: number,
    isVertical: boolean,
    step: number,
    numberOfStrokes: number,
  ) {
    const arrayOfScaleNumbers = calculateNumbersOnScale(
      numberOfStrokes,
      min,
      max,
    );
    const arrayOfScaleNumbersWithStep = arrayOfScaleNumbers.map(
      (item) => calculateValueWithStep(item, min, step),
    );

    this.arrayOfElements.forEach((item, index) => {
      const valueInPercents = calculateValueToPercents(
        arrayOfScaleNumbersWithStep[index],
        min,
        max,
      );
      item.textContent = String(arrayOfScaleNumbersWithStep[index]);
      if (this.getNextScaleValueContent(index) === item.textContent) item.remove();
      if (isVertical) {
        item.removeAttribute('style');
        if (
          +item.textContent > max
          || this.arrayOfElements[index]
            === this.arrayOfElements[this.arrayOfElements.length - 1]
        ) {
          item.style.top = '100%';
          item.textContent = String(max);
        } else {
          item.style.top = `${valueInPercents}%`;
        }
      } else {
        item.removeAttribute('style');
        if (
          +item.textContent > max
          || this.arrayOfElements[index]
            === this.arrayOfElements[this.arrayOfElements.length - 1]
        ) {
          item.style.left = '100%';
          item.textContent = String(max);
        } else {
          item.style.left = `${valueInPercents}%`;
        }
      }
    });
  }

  private createTemplate(numberOfStrokes: number) {
    this.scale.classList.add('js-bimkon-slider__scale');
    this.arrayOfElements = [];

    for (let i = 0; i < numberOfStrokes; i += 1) {
      this.scaleValue = document.createElement('div');
      this.scaleValue.classList.add('js-bimkon-slider__scale-value');
      this.arrayOfElements.push(this.scaleValue);
      this.scale.append(this.scaleValue);
    }
  }

  private getNextScaleValueContent(i: number) {
    if (this.arrayOfElements[i + 1] !== undefined) return this.arrayOfElements[i + 1].textContent;
  }
}

export default Scale;
