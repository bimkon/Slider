class RangePathLine {
  pathLine: HTMLElement;
  emptyBar: HTMLElement;
  constructor() {

    this.createTemplate();
  }


  private createTemplate() {
    
    this.pathLine = document.createElement('div');
    this.pathLine.classList.add('js-bimkon-slider__path-line');
    this.emptyBar = document.createElement('div');
    this.emptyBar.classList.add('js-bimkon-slider__empty-bar');

  }


}



export { RangePathLine };