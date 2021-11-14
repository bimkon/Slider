class TipView {
  tipElement!: HTMLElement;

  constructor() {
    this.createTemplate();
  }

  private createTemplate() {
    this.tipElement = document.createElement('div');
    this.tipElement.classList.add('js-bimkon-slider__tip');
  }

  setTipValue(value: number) {
    this.tipElement.textContent = `${value}`;
  }
}

export default TipView;
