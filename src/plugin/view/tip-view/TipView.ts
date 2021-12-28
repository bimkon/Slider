class TipView {
  tipElement: HTMLElement = document.createElement('div');

  constructor() {
    this.createTemplate();
  }

  setTipValue(value: number | string) {
    this.tipElement.textContent = `${value}`;
  }

  getValue(): number {
    return Number(this.tipElement.innerHTML);
  }

  hide() {
    this.tipElement.classList.add('js-bimkon-slider__tip_hidden');
  }

  show() {
    this.tipElement.classList.remove('js-bimkon-slider__tip_hidden');
  }

  private createTemplate() {
    this.tipElement.classList.add('js-bimkon-slider__tip');
  }
}

export default TipView;
