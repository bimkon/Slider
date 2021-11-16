class RangePathLine {
  pathLine: HTMLElement = document.createElement('div');

  emptyBar: HTMLElement = document.createElement('div');

  constructor() {
    this.createTemplate();
  }

  private createTemplate() {
    this.pathLine.classList.add('js-bimkon-slider__path-line');
    this.emptyBar.classList.add('js-bimkon-slider__empty-bar');
  }
}

export default RangePathLine;
