import { RangePathLine } from '../RangePathLine/RangePathLine';
import { ThumbView } from '../ThumbView/ThumbView';
import { EventObserver } from '../../EventObserver/EventObserver';

class SliderPath {
  public observer = new EventObserver();
  pathElement: HTMLElement;
  rangePathLine: RangePathLine;
  thumb: ThumbView;
  thumbElement: HTMLElement;
  left: any;
  thumbCoords: any;
  shiftX: number;
  newLeft: number;
  method: any;
  pathblock: HTMLElement;
  constructor() {

  this.createTemplate();
    

  }
  

// создает шкалу, импортирует и присваевает модуль создания дива между ползунками, импортирует создает и присваевает  tip(подсказку) родителю
  private createTemplate() {
    this.pathElement = document.createElement('div');
    this.pathElement.classList.add('js-bimkon-slider__path');
    this.pathblock = document.querySelector('js-bimkon-slider__path');
    this.rangePathLine = new RangePathLine();
    this.pathElement.append(this.rangePathLine.pathLine);
    this.thumb = new ThumbView();
    this.pathElement.append(this.thumb.thumbElement);
    

  }
  
  bindMoveListeners() {
    this.onMouseMove  = this.onMouseMove.bind(this);
    document.addEventListener('mousemove', this.onMouseMove);
    this.onMouseUp = this.onMouseUp.bind(this);
    document.addEventListener('mouseup', this.onMouseUp);
    this.handlePointerElementDragStart = this.handlePointerElementDragStart.bind(this);
    document.addEventListener('dragstart', this.handlePointerElementDragStart);
  }

  public initMouseMoves() {

    
    this.thumb.thumbElement.addEventListener('mousedown', (event) => {

      
      event.preventDefault();
      this.thumbCoords = this.getThumbCoords(this.thumb.thumbElement);
      this.shiftX = event.clientX - this.thumbCoords.left;
      
      this.bindMoveListeners();

   
    })
  }

  public onMouseMove(event:MouseEvent) {

    
    let sliderCoords = this.pathElement.getBoundingClientRect().left;
    this.newLeft = event.clientX - this.shiftX - sliderCoords;
    

    // let rightRange = sliderCoords.right - this.getThumbCoords(thumbMax).right;
    // курсор вышел из слайдера => оставить бегунок в его границах.
    if (this.newLeft < 0) {
      this.newLeft = 0;
    }
    let rightEdge = this.pathElement.offsetWidth - this.thumb.thumbElement.offsetWidth + this.thumb.thumbElement.offsetWidth;

    if (this.newLeft > rightEdge) {
      this.newLeft = rightEdge;
    }
         //300 px - 100%
         //50 px - x %?   
    this.thumb.thumbElement.style.left = this.calculateToPercents({valueInPixels: this.newLeft, pathElement: this.pathElement})  + '%';
    console.log(this.pathElement.getBoundingClientRect().width)
    // range.style.left = newLeft + 'px';
    // range.style.right = rightRange + 'px';

  }


  public onMouseUp() {

    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('dragstart', this.handlePointerElementDragStart);
  }

  public getThumbCoords(elem:HTMLElement) {
    
    let box = elem.getBoundingClientRect();

    return {
        left: box.left + pageXOffset,
        right: box.right + pageXOffset
    };
  }
  private handlePointerElementDragStart() {
    return false;
  }

  private calculateToPercents(options: {
    valueInPixels: number;
    pathElement: HTMLElement,
  }) {
    const {valueInPixels, pathElement} = options;
    const lengthInPixels: number = this.pathElement.getBoundingClientRect().width;
    const valueInPercents = (valueInPixels * 100) / lengthInPixels;
  return valueInPercents;
  }

}







export { SliderPath };