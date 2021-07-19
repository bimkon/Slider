/* eslint-disable no-param-reassign */
import { calculateValueToPercents, calculateNumbersOnScale } from '../formuls';

class Scale {
  scale: HTMLElement;

  scaleValue1: HTMLElement;

  scaleValue: HTMLElement;

  scaleValue2: HTMLElement;

  scaleValue3: HTMLElement;

  scaleValue4: HTMLElement;

  scaleValue5: HTMLElement;

  scaleValue6: HTMLElement;

  clickedItem: EventTarget;

  arrayElements: any;

  numberOfStrokes: number;

  constructor(numberOfStrokes: number) {
    this.createTemplate(numberOfStrokes);
    this.numberOfStrokes = numberOfStrokes;
  }

  createTemplate(numberOfStrokes: number) {
    this.scale = document.createElement('div');
    this.scale.classList.add('js-bimkon-slider__scale');
    this.arrayElements = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < numberOfStrokes; i++) {
      this.scaleValue = document.createElement('div');
      this.scaleValue.classList.add('js-bimkon-slider__scale_value');
      this.arrayElements.push(this.scaleValue);
    }
    this.arrayElements.forEach((item:HTMLElement) => {
      this.scale.append(item);
    });
  }

  initNumberOnScale(min:number, max:number, isVertical: boolean) {
    const arrayOfScaleNumbers = calculateNumbersOnScale(this.numberOfStrokes, min, max);
    this.arrayElements.forEach((item:HTMLElement, index:any, array: any) => {
      const valueInPercents = calculateValueToPercents(arrayOfScaleNumbers[index], min, max);
      array[index].textContent = String(arrayOfScaleNumbers[index]);
      if (isVertical) {
        array[index].removeAttribute('style');
        array[index].style.top = `${valueInPercents}%`;
      } else {
        array[index].removeAttribute('style');
        array[index].style.left = `${valueInPercents}%`;
      }
    });
  }
}

export { Scale };
export default { Scale };
