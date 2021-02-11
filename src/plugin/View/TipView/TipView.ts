
 class TipView {
   
 tipElement: HTMLElement;

  constructor() {
    this.createTemplate();

  }
  private createTemplate() {
    this.tipElement = document.createElement('div');
    this.tipElement.classList.add('js-bimkon-slider__tip');
  }
 }

export { TipView };