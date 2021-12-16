class TipView {
  tipElement: HTMLElement = document.createElement('div');

  constructor() {
    this.createTemplate();
  }

  setTipValue(value: number) {
    this.tipElement.textContent = `${value}`;
  }

  private createTemplate() {
    this.tipElement.classList.add('js-bimkon-slider__tip');
  }
}

export default TipView;
