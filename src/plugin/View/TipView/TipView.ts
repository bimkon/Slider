class TipView {
  tipElement: HTMLElement = document.createElement('div');

  constructor() {
    this.createTemplate();
  }

  private createTemplate() {
    this.tipElement.classList.add('js-bimkon-slider__tip');
  }

  setTipValue(value: number) {
    this.tipElement.textContent = `${value}`;
  }
}

export default TipView;
