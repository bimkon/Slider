/* eslint-disable no-param-reassign */
import {
  calculateValueToPercents,
  calculateNumbersOnScale,
  calculateValueWithStep,
} from '../formuls';

class Scale {
  scale: HTMLElement;

  scaleValue: HTMLElement;

  arrayOfElements: Array<HTMLElement>;

  arrayOfNewElements: Array<HTMLElement>;

  numberOfStrokes: number;

  constructor(numberOfStrokes: number) {
    this.createTemplate(numberOfStrokes);
    this.numberOfStrokes = numberOfStrokes;
  }

  createTemplate(numberOfStrokes: number) {
    this.scale = document.createElement('div');
    this.scale.classList.add('js-bimkon-slider__scale');
    this.arrayOfElements = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < numberOfStrokes; i++) {
      this.scaleValue = document.createElement('div');
      this.scaleValue.classList.add('js-bimkon-slider__scale_value');
      this.arrayOfElements.push(this.scaleValue);
    }
    this.arrayOfElements.forEach((item: HTMLElement) => {
      this.scale.append(item);
    });
  }

  initNumberOnScale(
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
    const arrayOfScaleNumbersWithStep = arrayOfScaleNumbers.map((item) => calculateValueWithStep(item, min, step));
    const nextItem = (i: number) => {
      if (this.arrayOfElements[i + 1] === undefined) return false;
      return this.arrayOfElements[i + 1].textContent;
    };
    this.arrayOfElements.forEach((item, index) => {
      const valueInPercents = calculateValueToPercents(
        arrayOfScaleNumbersWithStep[index],
        min,
        max,
      );
      item.textContent = String(arrayOfScaleNumbersWithStep[index]);
      if (nextItem(index) === item.textContent) item.remove();
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
}

export default Scale;
