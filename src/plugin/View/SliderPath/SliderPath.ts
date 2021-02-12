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
  shiftX: any;
  newLeft: any;
  method: any;

  constructor() {

    this.createTemplate();
    // this.bindMouseMoves();
    this.addObservers();
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
  
  /**
   * CallBindMouseMoves
   */
  public addObservers() {
    this.observer.subscribe((method:any) => {method});
  }

  public bindMouseMoves() {
    console.log('1');
    
    this.thumb.thumbElement.addEventListener('mousedown', (event) => {
      console.log('2');
      event.preventDefault();
      this.thumbCoords = this.getThumbCoords(this.thumb.thumbElement);
      this.shiftX = event.clientX - this.thumbCoords.left;
    
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);

    this.onMouseMove(event);
    this.onMouseUp();
    })
  }
  public onMouseMove(event:MouseEvent) {
    console.log('3');
    this.newLeft = event.clientX - this.shiftX - this.pathElement.getBoundingClientRect().left;
    // let rightRange = sliderCoords.right - this.getThumbCoords(thumbMax).right;
    // курсор вышел из слайдера => оставить бегунок в его границах.
    if (this.newLeft < 0) {
      this.newLeft = 0;
    }
    // let rightEdge = slider.offsetWidth - thumbMin.offsetWidth;
    // if (newLeft > rightEdge) {
    //   newLeft = rightEdge;
    // }
            
    this.thumb.thumbElement.style.left = this.newLeft + 'px';
    // range.style.left = newLeft + 'px';
    // range.style.right = rightRange + 'px';

  }


  public onMouseUp() {
    console.log('4');
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);
  }

  public getThumbCoords(elem:HTMLElement) {
    
    let box = elem.getBoundingClientRect();

    return {
        // top: box.top + pageYOffset,
        left: box.left + pageXOffset,
        right: box.right + pageXOffset
    };
  }



}







export { SliderPath };