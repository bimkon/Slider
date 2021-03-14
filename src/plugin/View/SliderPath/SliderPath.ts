import { RangePathLine } from '../RangePathLine/RangePathLine';
import { ThumbView } from '../ThumbView/ThumbView';
import { Scale } from '../Scale/Scale';
import { EventObserver } from '../../EventObserver/EventObserver';
import bind from 'bind-decorator';
import { SliderOptions } from '../../SliderOptions';

class SliderPath {
  public observer = new EventObserver();
  pathElement: HTMLElement;
  rangePathLine: RangePathLine;
  thumb: ThumbView;
  thumbElement: HTMLElement;
  left: any;
  thumbCoords: any;
  shiftX: number;
  shiftY: number;
  newLeft: number;
  newTop: number;
  method: any;
  pathblock: HTMLElement;
  mousePosition: number;
  mouseX: number;
  scale: Scale;
  currentScaleValue: number;
  valueToPercents: number;
  percentsToPixels: number;
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
    this.thumb = new ThumbView();
    this.pathElement.append(this.thumb.thumbElement);
    this.scale = new Scale();
    this.pathElement.append(this.scale.scale);
  }
  @bind
  calculateValueToPercents(positionValue: number, min: number, max: number): number {

    return ((positionValue - min) * 100) / (max - min);
  }
  @bind
  calculateToPixels(options: {
    valueInPercents: number,
    pathElement: HTMLElement,
  }) {
    const { valueInPercents, pathElement, } = options;
    const lengthInPixels: number = pathElement.getBoundingClientRect().height
    const valueInPixels = (valueInPercents / 100) * lengthInPixels;
    return valueInPixels;
  }
  
  bindEventListenersToScale(min:number, max:number) {

    this.scale.scale.addEventListener('click', this.showNumber.bind(event, min,max));
    
  }
 
 @bind
  showNumber (min: number, max: number, event:MouseEvent, ) {
  
   const target = event.target as HTMLTextAreaElement;
   if (target.className !== 'js-bimkon-slider__scale_value') return
   const scaleValue = Number(target.textContent);
   this.valueToPercents = this.calculateValueToPercents(scaleValue, min, max);
   this.percentsToPixels = this.calculateToPixels({valueInPercents: this.valueToPercents, pathElement: this.pathElement });
   this.dispatchThumbPosition(this.percentsToPixels);
   
 }

  initPathclick(isVertical:boolean) {
  this.rangePathLine.emptyBar.addEventListener('mousedown', (event) => {

    event.preventDefault();
    if (isVertical) {
      this.shiftY = 0;
      this.newTop = event.clientY -  this.pathElement.getBoundingClientRect().top;
      this.dispatchThumbPosition(this.newTop);
      document.addEventListener('mousemove',  this.mouseMoveWithData);
      document.addEventListener('mouseup',  this.mouseUpWithData);
      document.addEventListener('dragstart', this.handlePointerElementDragStart);
    }
    else {
      this.shiftX = 0;
      this.newLeft = event.clientX -  this.pathElement.getBoundingClientRect().left;
      this.dispatchThumbPosition(this.newLeft);
      document.addEventListener('mousemove',  this.mouseMoveWithData);
      document.addEventListener('mouseup',  this.mouseUpWithData);
      document.addEventListener('dragstart', this.handlePointerElementDragStart);
    }

  });
  }

  public bindEventListeners(isVertical:boolean) {

    this.mouseDownWithData = this.mouseDown.bind(this, isVertical);
    this.mouseMoveWithData = this.onMouseMove.bind(this, isVertical);
    this.mouseUpWithData = this.onMouseUp.bind(null,  this.mouseUpWithData, this.mouseMoveWithData);
    this.thumb.thumbElement.addEventListener('mousedown',  this.mouseDownWithData);

  }

 
  mouseDown( isVertical:boolean,event: MouseEvent) {
    
    event.preventDefault();
    if (isVertical) {
      this.shiftY = event.clientY - this.thumb.thumbElement.getBoundingClientRect().top
      document.addEventListener('mousemove', this.mouseMoveWithData);
      document.addEventListener('mouseup', this.mouseUpWithData);
      document.addEventListener('dragstart', this.handlePointerElementDragStart);
    }
    else {
      this.shiftX = event.clientX - this.thumb.thumbElement.getBoundingClientRect().left - this.thumb.thumbElement.offsetWidth/2;
      document.addEventListener('mousemove', this.mouseMoveWithData);
      document.addEventListener('mouseup', this.mouseUpWithData);
      document.addEventListener('dragstart', this.handlePointerElementDragStart);
    }

  }

  @bind
  updatePointerPosition(newPosition:number, options?: SliderOptions) {
    const {isVertical} = options;
    if (isVertical) {
      this.thumb.thumbElement.style.top = `${newPosition}%`;
      this.updateRangePosition(options, newPosition );
    }
    else {
      this.thumb.thumbElement.style.left = `${newPosition}%`;
      this.updateRangePosition(options, newPosition );
    }

  }

  @bind 
  updateRangePosition(options: SliderOptions, newPosition: number) {
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

  
  public onMouseMove(isVertical:boolean, event:MouseEvent, ) {
    if (isVertical) {
      this.newTop = event.clientY - this.shiftY - this.pathElement.getBoundingClientRect().top;

      if (this.newTop < 0) {
        this.newTop = 0;
      }
      let rightEdge = this.pathElement.offsetHeight - this.thumb.thumbElement.offsetHeight + this.thumb.thumbElement.offsetHeight;
  
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
      let rightEdge = this.pathElement.offsetWidth - this.thumb.thumbElement.offsetWidth + this.thumb.thumbElement.offsetWidth;
  
      if (this.newLeft > rightEdge) {
        this.newLeft = rightEdge;
      }
      this.dispatchThumbPosition(this.newLeft);
    }
  }
    // let rightRange = sliderCoords.right - this.getThumbCoords(thumbMax).right;
    // курсор вышел из слайдера => оставить бегунок в его границах.

         //300 px - 100%
         //50 px - x %?   
         // calculate cursor position
         //width.slider(300px)            - 1
         //(curcorPX-leftslidercoor=50px) - x
         //max-min - 100+min
         //positioninpercents - x

    // const newPosition: number = (event.clientX - this.pathElement.getBoundingClientRect().left) * 100 / this.pathElement.offsetWidth;
    // range.style.left = newLeft + 'px';
    // range.style.right = rightRange + 'px';
    // alert(typeof valuepointer); 
  // calculatePercentsToValue(positionInPercents: number): number {
  //   const min = 0;
  //   const max = 100;
  //   return ((max - min) * positionInPercents) / 100 + min;
  // }


  public onMouseUp(mouseUpWithData: EventListenerOrEventListenerObject,mouseMoveWithData: EventListenerOrEventListenerObject) {

    document.removeEventListener('mouseup', mouseUpWithData);
    document.removeEventListener('mousemove',  mouseMoveWithData);
    // document.removeEventListener('dragstart', this.handlePointerElementDragStart);
  }

  private handlePointerElementDragStart() {
    return false;
  }

  private calculateToPercents(options: {
    valueInPixels: number;
    pathElement: HTMLElement,
    isVertical: boolean,
  }) {
    const {valueInPixels, pathElement, isVertical} = options;
    const lengthInPixels: number = isVertical ? pathElement.getBoundingClientRect().height : pathElement.getBoundingClientRect().width;
    const valueInPercents = (valueInPixels * 100) / lengthInPixels;
  return valueInPercents;
  }

  
  private dispatchThumbPosition(positionInPixels: number, isVertical?:boolean) {
    
    this.observer.broadcast({
      position: this.calculateToPercents ({
        valueInPixels: positionInPixels,
        pathElement: this.pathElement,
        isVertical,
        
      })

    });
  }



}







export { SliderPath };