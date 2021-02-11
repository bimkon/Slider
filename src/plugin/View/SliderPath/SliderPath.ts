import { RangePathLine } from '../RangePathLine/RangePathLine';
import { ThumbView } from '../ThumbView/ThumbView';

class SliderPath {

  pathElement: HTMLElement;
  rangePathLine: RangePathLine;
  thumb: ThumbView;
  constructor() {

    this.createTemplate();

  }
  

// создает шкалу, импортирует и присваевает модуль создания дива между ползунками, импортирует создает и присваевает  tip(подсказку) родителю
  private createTemplate() {
    this.pathElement = document.createElement('div');
    this.pathElement.classList.add('js-bimkon-slider__path');
    this.rangePathLine = new RangePathLine();
    this.pathElement.append(this.rangePathLine.pathLine);
    this.thumb = new ThumbView();
    this.pathElement.append(this.thumb.thumbElement);
  }


}






export { SliderPath };