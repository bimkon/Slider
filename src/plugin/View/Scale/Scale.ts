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
    console.log(this.numberOfStrokes)
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

    // this.arrayElements[0].textContent = String(min);
    // const firstInPercents = calculateValueToPercents(this.arrayElements[0].textContent, min, max);
    // this.arrayElements[0].style.left = `${firstInPercents}%`;

    // this.arrayElements[1].textContent = String((Math.floor((((max - min) / 5) * 1 + min) / 10)) * 10);
    // const secondInPercents = calculateValueToPercents(this.arrayElements[1].textContent, min, max);
    // this.arrayElements[1].style.left = `${secondInPercents}%`;

    // this.arrayElements[2].textContent = String((Math.floor((((max - min) / 5) * 2 + min) / 10)) * 10);
    // const thirdInPercents = calculateValueToPercents(this.arrayElements[2].textContent, min, max);
    // this.arrayElements[2].style.left = `${thirdInPercents}%`;

    // this.arrayElements[3].textContent = String((Math.floor((((max - min) / 5) * 3 + min) / 10)) * 10);
    // const fourthInPercents = calculateValueToPercents(this.arrayElements[3].textContent, min, max);
    // this.arrayElements[3].style.left = `${fourthInPercents}%`;

    // this.arrayElements[4].textContent = String((Math.floor((((max - min) / 5) * 4 + min) / 10)) * 10);
    // const fiveInPercents = calculateValueToPercents(this.arrayElements[4].textContent, min, max);
    // this.arrayElements[4].style.left = `${fiveInPercents}%`;

    // this.arrayElements[this.arrayElements.length - 1].textContent = String(max);
    // const lastInPercents = calculateValueToPercents(this.arrayElements[this.arrayElements.length - 1].textContent, min, max);
    // this.arrayElements[this.arrayElements.length - 1].style.left = `${lastInPercents}%`;
  }
}

export { Scale };
export default { Scale };
