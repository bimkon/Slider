import { RangePathLine } from '../RangePathLine/RangePathLine';
import { ThumbView } from '../ThumbView/ThumbView';
import { Scale } from '../Scale/Scale';
import { EventObserver } from '../../EventObserver/EventObserver';
import bind from 'bind-decorator';
import { SliderOptions } from '../../SliderOptions';
import {calculateToPercents, calculateToPixels, calculateValueToPercents  } from '../formuls';


class SliderPath {
  public observer = new EventObserver();
  pathElement: HTMLElement;
  rangePathLine: RangePathLine;
  thumbElement: HTMLElement;
  left: any;
  thumbCoords: any;
  method: any;
  pathblock: HTMLElement;
  mousePosition: number;
  mouseX: number;
  scale: Scale;
  currentScaleValue: number;
  valueToPercents: number;
  percentsToPixels: number;
  fromValuePointer: ThumbView;
  toValuePointer: ThumbView;
  shiftX: number;
  shiftY: number;
  newLeft: number;
  newTop: number;
  mouseDownWithData: EventListenerOrEventListenerObject;
  mouseMoveWithData: EventListenerOrEventListenerObject;
  mouseUpWithData: EventListenerOrEventListenerObject;


  constructor() {

  this.createTemplate();
 

  }
  

// создает шкалу, импортирует и присваевает модуль создания дива между ползунками, импортирует создает и присваевает  tip(подсказку) родителю
  private createTemplate() {
    this.pathElement = document.createElement('div');
    this.pathElement.classList.add('js-bimkon-slider__path');
    this.rangePathLine = new RangePathLine();
    this.pathElement.append(this.rangePathLine.pathLine);
    this.pathElement.append(this.rangePathLine.emptyBar);
    this.fromValuePointer = new ThumbView(this.pathElement);
    this.pathElement.append(this.fromValuePointer.thumbElement);
    this.scale = new Scale();
    this.pathElement.append(this.scale.scale);
  }

  public setPointerPosition(data: {
    min: number, 
    max: number,
    fromPointerInPercents: number,
    options: SliderOptions,
  }) {
    const { min, max, fromPointerInPercents, options } = data;
    
    const {isVertical} = options;
    this.fromValuePointer.updatePointerPosition(fromPointerInPercents, options);
    this.updateRangeLine(options, fromPointerInPercents);
  }
  
  makeRange(isRange:boolean) {
    if (isRange) {
      this.toValuePointer = new ThumbView(this.pathElement);
      this.pathElement.append(this.toValuePointer.thumbElement);

    }
  }

  bindEventListenersToScale(min:number, max:number) {

    this.scale.scale.addEventListener('click', this.showNumber.bind(event, min,max));
    
  }

 @bind
  showNumber (min: number, max: number, event:MouseEvent, ) {
  
   const target = event.target as HTMLTextAreaElement;
   if (target.className !== 'js-bimkon-slider__scale_value') return
   const scaleValue = Number(target.textContent);
   this.valueToPercents = calculateValueToPercents(scaleValue, min, max);
   this.percentsToPixels = calculateToPixels({valueInPercents: this.valueToPercents, pathElement: this.pathElement });
   this.dispatchThumbPosition(this.percentsToPixels);
   
 }
  bindEventListenersToBar(isVertical:boolean, isRange:boolean) {
  this.mouseDownWithData = this.mouseDown.bind(this, isVertical, isRange);
  this.rangePathLine.emptyBar.addEventListener('mousedown',  this.mouseDownWithData);
  this.rangePathLine.emptyBar.addEventListener('dragstart', this.handlePointerElementDragStart);
}

  // initPathclick(isVertical:boolean) {

  // this.rangePathLine.emptyBar.addEventListener('mousedown', (event) => {

  //   event.preventDefault();
  //   if (isVertical) {
  //     this.shiftY = 0;
  //     this.newTop = event.clientY -  this.pathElement.getBoundingClientRect().top;
  //     this.dispatchThumbPosition(this.newTop);
  //     document.addEventListener('mousemove',  this.mouseMoveWithData);
  //     document.addEventListener('mouseup',  this.mouseUpWithData);
  //     document.addEventListener('dragstart', this.handlePointerElementDragStart);
  //   }
  //   else {
  //     this.shiftX = 0;
  //     this.newLeft = event.clientX -  this.pathElement.getBoundingClientRect().left;
  //     this.dispatchThumbPosition(this.newLeft);
  //     document.addEventListener('mousemove',  this.mouseMoveWithData);
  //     document.addEventListener('mouseup',  this.mouseUpWithData);
  //     document.addEventListener('dragstart', this.handlePointerElementDragStart);
  //   }

  // });
  // }

mouseDown(  isVertical: boolean,isRange: boolean, event: MouseEvent, ) {
  event.preventDefault();
  if (isVertical) {
    this.shiftY = 0;
    this.newTop = event.clientY -  this.pathElement.getBoundingClientRect().top;
    this.dispatchThumbPosition(this.newTop);
    this.mouseMoveWithData = this.onMouseMove.bind(this, isVertical, event);
    document.addEventListener('mousemove',  this.mouseMoveWithData);
    this.mouseUpWithData = this.onMouseUp.bind(null,  this.mouseUpWithData, this.mouseMoveWithData);
    document.addEventListener('mouseup',  this.mouseUpWithData);
    document.addEventListener('dragstart', this.handlePointerElementDragStart);
  }
  else {
    this.shiftX = 0;
    this.newLeft = event.clientX -  this.pathElement.getBoundingClientRect().left;
    this.dispatchThumbPosition(this.newLeft);
    this.mouseMoveWithData = this.onMouseMove.bind(this, isVertical, event);
    document.addEventListener('mousemove',  this.mouseMoveWithData);
    this.mouseUpWithData = this.onMouseUp.bind(null,  this.mouseUpWithData, this.mouseMoveWithData);
    document.addEventListener('mouseup',  this.mouseUpWithData);
    document.addEventListener('dragstart', this.handlePointerElementDragStart);
  }

}

public onMouseMove(  isVertical:boolean,isRange:boolean, event: MouseEvent, ) {


if (isVertical) {


  this.newTop = event.clientY - this.shiftY - this.pathElement.getBoundingClientRect().top;



  if (this.newTop < 0) {
    this.newTop = 0;
  }
  let rightEdge = this.pathElement.offsetHeight - this.fromValuePointer.thumbElement.offsetHeight +  this.fromValuePointer.thumbElement.offsetHeight;

  if (this.newTop > rightEdge) {
    this.newTop = rightEdge;
  }
  this.dispatchThumbPosition(this.newTop, isVertical);
}
else {
  this.newLeft = event.clientX - this.shiftX - this.pathElement.getBoundingClientRect().left;
  if (this.newLeft < 0) {
    this.newLeft = 0;
  }
  let rightEdge = this.pathElement.offsetWidth -  this.fromValuePointer.thumbElement.offsetWidth +  this.fromValuePointer.thumbElement.offsetWidth;

  if (this.newLeft > rightEdge) {
    this.newLeft = rightEdge;
  }
  this.dispatchThumbPosition(this.newLeft);
}
}

public onMouseUp(mouseUpWithData: EventListenerOrEventListenerObject,mouseMoveWithData: EventListenerOrEventListenerObject) {

document.removeEventListener('mouseup', mouseUpWithData);
document.removeEventListener('mousemove',  mouseMoveWithData);
// document.removeEventListener('dragstart', this.handlePointerElementDragStart);
}

public handlePointerElementDragStart() {
return false;
}



  public bindEventListeners(isVertical:boolean, isRange:boolean) {
    this.fromValuePointer.bindEventListeners(isVertical, isRange);
  
  }

  @bind 
  updateRangeLine(options: SliderOptions, newPosition: number) {
    const {isVertical} = options;
      if (isVertical) {
        this.rangePathLine.pathLine.style.top = `0%`;
        this.rangePathLine.pathLine.style.height = `${newPosition}%`;
      }
      else {
        this.rangePathLine.pathLine.style.left = `0%`;
        this.rangePathLine.pathLine.style.width = `${newPosition}%`;
      }
  }

  private dispatchThumbPosition(positionInPixels: number, isVertical?:boolean) {
    
    this.observer.broadcast({
      position: calculateToPercents ({
        valueInPixels: positionInPixels,
        pathElement: this.pathElement,
        isVertical,
      })
    });
  }

}







export { SliderPath };