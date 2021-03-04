class RangePathLine {
  pathLine: HTMLElement;
  constructor() {

    this.createTemplate();
  }
  initSingleRange() {

  }

  private createTemplate() {
    this.pathLine = document.createElement('div');
    this.pathLine.classList.add('js-bimkon-slider__path-line');

  }


}



export { RangePathLine };