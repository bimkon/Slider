/* eslint-disable no-param-reassign */
import { calculateValueToPercents, calculateNumbersOnScale } from '../formuls';

class Scale {
  scale: HTMLElement;

  scaleValue: HTMLElement;

  arrayOfElements: Array<HTMLElement>;

  numberOfStrokes: number;

  constructor(numberOfStrokes: number) {
    this.createTemplate(numberOfStrokes);
    this.numberOfStrokes = numberOfStrokes;
  }

  createTemplate(numberOfStrokes: number) {
    this.scale = document.createElement('div');
    this.scale.classList.add('bimkon-slider__scale');
    this.arrayOfElements = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < numberOfStrokes; i++) {
      this.scaleValue = document.createElement('div');
      this.scaleValue.classList.add('bimkon-slider__scale_value');
      this.arrayOfElements.push(this.scaleValue);
    }
    this.arrayOfElements.forEach((item:HTMLElement) => {
      this.scale.append(item);
    });
  }

  initNumberOnScale(min:number, max:number, isVertical: boolean) {
    const arrayOfScaleNumbers = calculateNumbersOnScale(this.numberOfStrokes, min, max);
    this.arrayOfElements.forEach((item, index) => {
      const valueInPercents = calculateValueToPercents(arrayOfScaleNumbers[index], min, max);
      item.textContent = String(arrayOfScaleNumbers[index]);
      if (isVertical) {
        item.removeAttribute('style');
        item.style.top = `${valueInPercents}%`;
      } else {
        item.removeAttribute('style');
        item.style.left = `${valueInPercents}%`;
      }
    });
  }
}

export { Scale };
export default { Scale };
