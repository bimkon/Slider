class Scale {
  scale: HTMLElement;

  scaleValue1: HTMLElement;

  scaleValue2: HTMLElement;

  scaleValue3: HTMLElement;

  scaleValue4: HTMLElement;

  scaleValue5: HTMLElement;

  scaleValue6: HTMLElement;

  clickedItem: EventTarget;

  scaleValue: number;

  constructor() {
    this.createTemplate();
  }

  createTemplate() {
    this.scale = document.createElement('div');
    this.scale.classList.add('js-bimkon-slider__scale');
    this.scaleValue1 = document.createElement('div');
    this.scaleValue1.classList.add('js-bimkon-slider__scale_value');
    this.scale.append(this.scaleValue1);
    this.scaleValue2 = document.createElement('div');
    this.scaleValue2.classList.add('js-bimkon-slider__scale_value');
    this.scale.append(this.scaleValue2);
    this.scaleValue3 = document.createElement('div');
    this.scaleValue3.classList.add('js-bimkon-slider__scale_value');
    this.scale.append(this.scaleValue3);
    this.scaleValue4 = document.createElement('div');
    this.scaleValue4.classList.add('js-bimkon-slider__scale_value');
    this.scale.append(this.scaleValue4);
    this.scaleValue5 = document.createElement('div');
    this.scaleValue5.classList.add('js-bimkon-slider__scale_value');
    this.scale.append(this.scaleValue5);
    this.scaleValue6 = document.createElement('div');
    this.scaleValue6.classList.add('js-bimkon-slider__scale_value');
    this.scale.append(this.scaleValue6);
  }

  initNumberOnScale(min:number, max:number) {
    this.scaleValue1.textContent = String(min);
    this.scaleValue2.textContent = String((Math.floor((((max - min) / 5) * 1 + min) / 10)) * 10);
    this.scaleValue3.textContent = String((Math.floor((((max - min) / 5) * 2 + min) / 10)) * 10);
    this.scaleValue4.textContent = String((Math.floor((((max - min) / 5) * 3 + min) / 10)) * 10);
    this.scaleValue5.textContent = String((Math.floor((((max - min) / 5) * 4 + min) / 10)) * 10);
    this.scaleValue6.textContent = String(max);
  }
}

export { Scale };
export default { Scale };
