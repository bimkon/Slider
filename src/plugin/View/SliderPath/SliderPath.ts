import { RangePathLine } from '../RangePathLine/RangePathLine';
import { ThumbView } from '../ThumbView/ThumbView';
import { Scale } from '../Scale/Scale';
import { EventObserver } from '../../EventObserver/EventObserver';
import bind from 'bind-decorator';
import { SliderOptions } from '../../SliderOptions';
import {calculateToPercents, calculateToPixels, calculateValueToPercents  } from '../formuls';


class SliderPath {
  observer = new EventObserver();
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
  newPositionInPercents:number;
  midBetweenPointers: number;


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

  }

  makeRange() {
      this.toValuePointer = new ThumbView(this.pathElement);
      this.pathElement.append(this.toValuePointer.thumbElement);
      this.fromValuePointer.observer.subscribe(this.dispatchThumbPosition);
      this.toValuePointer.observer.subscribe(this.dispatchThumbPosition);
      this.scale = new Scale();
      this.pathElement.append(this.scale.scale);
    }
  
 makeSingle() {
    this.fromValuePointer.observer.subscribe(this.dispatchThumbPosition);
    this.scale = new Scale();
    this.pathElement.append(this.scale.scale);
  }
  public setPointerPosition(data: {
    fromPointerValue: number;
    fromInPercents: number;
    toPointerValue: number;
    toInPercents: number;
    options: SliderOptions,
  }) {
    const {fromPointerValue,  fromInPercents, toPointerValue, toInPercents, options } = data;
    
    const {isVertical} = options;
    this.fromValuePointer.updatePointerPosition(fromInPercents, options);
    if (this.toValuePointer) this.toValuePointer.updatePointerPosition(toInPercents, options);
    this.updateRangeLine(options, fromInPercents, toInPercents);
  }
  
  @bind 
  updateRangeLine(options: SliderOptions, fromInPercents: number, toInPercents: number) {
    const {isVertical, isRange} = options;
      if (isVertical) {
        if (isRange) {
        // this.rangePathLine.pathLine.style.top = `0%`;
        // this.rangePathLine.pathLine.style.height = `${fromInPercents}%`;
        }
        this.rangePathLine.pathLine.style.top = `0%`;
        this.rangePathLine.pathLine.style.height = `${fromInPercents}%`;
     
      }
      else {
        if (isRange) {
          this.rangePathLine.pathLine.style.left = `${fromInPercents}%`;
          this.rangePathLine.pathLine.style.width = `${toInPercents-fromInPercents}%`;
        }
        else {
        this.rangePathLine.pathLine.style.left = `0%`;
        this.rangePathLine.pathLine.style.width = `${fromInPercents}%`;
        }
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
   this.midBetweenPointers = ((this.toValuePointer.thumbElement.getBoundingClientRect().left- this.fromValuePointer.thumbElement.getBoundingClientRect().left) /2) + this.fromValuePointer.thumbElement.getBoundingClientRect().left - this.fromValuePointer.thumbElement.offsetWidth;

    this.newLeft = event.clientX -  this.pathElement.getBoundingClientRect().left;
    console.log(this.newLeft)
    console.log(this.midBetweenPointers)
   if (this.newLeft < this.midBetweenPointers ) this.dispatchThumbPosition({position: this.percentsToPixels, pointerToMove:this.fromValuePointer});
    if (this.newLeft > this.midBetweenPointers ) this.dispatchThumbPosition({position: this.percentsToPixels, pointerToMove:this.toValuePointer});

   
 }
  bindEventListenersToBar(isVertical:boolean, isRange:boolean) {
  this.mouseDownWithData = this.mouseDown.bind(this, isVertical, isRange);
  this.rangePathLine.emptyBar.addEventListener('mousedown',  this.mouseDownWithData);
  this.rangePathLine.emptyBar.addEventListener('dragstart', this.handlePointerElementDragStart);
}

mouseDown(  isVertical: boolean,isRange: boolean, event: MouseEvent, ) {
  const currentTarget = event.target as HTMLTextAreaElement;
  if (currentTarget.className !== 'js-bimkon-slider__empty-bar') return
  event.preventDefault();
  if (isVertical) {
    this.shiftY = 0;
    this.newTop = event.clientY -  this.pathElement.getBoundingClientRect().top;
    this.dispatchThumbPosition({position:this.newTop, pointerToMove: this.fromValuePointer});
    this.mouseMoveWithData = this.onMouseMove.bind(this, isVertical, event);
    document.addEventListener('mousemove',  this.mouseMoveWithData);
    this.mouseUpWithData = this.onMouseUp.bind(null,  this.mouseUpWithData, this.mouseMoveWithData);
    document.addEventListener('mouseup',  this.mouseUpWithData);
    document.addEventListener('dragstart', this.handlePointerElementDragStart);
  }
  else {
    this.shiftX = 0;
    this.newLeft = event.clientX -  this.pathElement.getBoundingClientRect().left;
    this.newPositionInPercents = calculateToPercents({valueInPixels: this.newLeft, pathElement: this.pathElement, isVertical })
    if (isRange) {
      this.midBetweenPointers = ((this.toValuePointer.thumbElement.getBoundingClientRect().left- this.fromValuePointer.thumbElement.getBoundingClientRect().left) /2) + this.fromValuePointer.thumbElement.getBoundingClientRect().left - this.fromValuePointer.thumbElement.offsetWidth;

      if (this.newLeft < this.midBetweenPointers) this.dispatchThumbPosition({position:this.newPositionInPercents, pointerToMove: this.fromValuePointer});
      if (this.newLeft > this.midBetweenPointers) this.dispatchThumbPosition({position:this.newPositionInPercents, pointerToMove: this.toValuePointer});
      
    }
    else {
      this.dispatchThumbPosition({position:this.newPositionInPercents, pointerToMove: this.fromValuePointer});
    }
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
    // this.dispatchThumbPosition(this.newTop, isVertical);
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
    
    this.midBetweenPointers = ((this.toValuePointer.thumbElement.getBoundingClientRect().left- this.fromValuePointer.thumbElement.getBoundingClientRect().left) /2) + this.fromValuePointer.thumbElement.getBoundingClientRect().left - this.fromValuePointer.thumbElement.offsetWidth;
    if (this.newLeft < this.midBetweenPointers && this.fromValuePointer.thumbElement.classList.contains('js-bimkon-slider__thumb_selected')) this.dispatchThumbPosition({position: calculateToPercents({valueInPixels: this.newLeft, pathElement: this.pathElement, isVertical }), pointerToMove:this.fromValuePointer});
    if (this.newLeft > this.midBetweenPointers && this.toValuePointer.thumbElement.classList.contains('js-bimkon-slider__thumb_selected')) this.dispatchThumbPosition({position: calculateToPercents({valueInPixels: this.newLeft, pathElement: this.pathElement, isVertical }), pointerToMove:this.toValuePointer});
    
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
    if (isRange) this.toValuePointer.bindEventListeners(isVertical, isRange);
}


@bind
  private dispatchThumbPosition(data: {position: number, pointerToMove?: ThumbView, }) {
    const {position, pointerToMove} = data;
    this.updateZIndex(pointerToMove)
    this.observer.broadcast({
      position,
      pointerToMove: this.checkPointerType(pointerToMove),
    });
  }
  private updateZIndex(pointer: ThumbView) {

      switch (pointer) {
        case this.fromValuePointer:
          this.toValuePointer.thumbElement.classList.remove('js-bimkon-slider__thumb_selected');
          break;
        case this.toValuePointer:
          this.fromValuePointer.thumbElement.classList.remove('js-bimkon-slider__thumb_selected');
          break;
        default:
      }
      pointer.thumbElement.classList.add('js-bimkon-slider__thumb_selected')

  }

private checkPointerType(pointer: ThumbView) {
  switch (pointer) {
    case this.fromValuePointer: return 'fromValue';
    case this.toValuePointer: return 'toValue';
    default: return null;
  }
}


}


export { SliderPath };