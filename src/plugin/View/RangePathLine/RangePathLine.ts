class RangePathLine {
  pathLine: HTMLElement;
  constructor() {

    this.createTemplate();
  }


  private createTemplate() {
    this.pathLine = document.createElement('div');
    this.pathLine.classList.add('js-bimkon-slider__path-line');

  }


}



export { RangePathLine };