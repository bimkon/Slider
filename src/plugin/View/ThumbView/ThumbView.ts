import { TipView } from '../TipView/TipView';
import { SliderOptions } from '../../SliderOptions';
import { EventObserver } from '../../EventObserver/EventObserver';
import {calculateToPercents, calculateToPixels, calculateValueToPercents  } from '../formuls';
import bind from 'bind-decorator';

 class ThumbView {
  public tip: TipView;
  public thumbElement: HTMLElement;
  mouseDownWithData: EventListenerOrEventListenerObject;
  mouseMoveWithData: EventListenerOrEventListenerObject;
  mouseUpWithData: EventListenerOrEventListenerObject;
  toValuePointer: ThumbView;
  shiftX: number;
  shiftY: number;
  newLeft: number;
  newTop: number;
  public pathElement: HTMLElement;
  public observer = new EventObserver();
  
  
  
  
  constructor(pathElement: HTMLElement) {
    this.pathElement = pathElement;
    this.createTemplate();

  }
  private createTemplate() {
    this.thumbElement = document.createElement('div');
    this.thumbElement.classList.add('js-bimkon-slider__thumb');
    this.tip = new TipView();
    this.thumbElement.append(this.tip.tipElement);
    
  }


  updatePointerPosition(newPosition:number, options?: SliderOptions) {

    const {isVertical, isRange} = options;
    if (isVertical) {
      this.thumbElement.style.top = `${newPosition}%`;
    }
    else {

      this.thumbElement.style.left = `${newPosition}%`;
    }
  }

  bindEventListeners(isVertical:boolean, isRange:boolean) {
    
      this.mouseDownWithData = this.mouseDown.bind(this, isVertical, isRange);
      this.thumbElement.addEventListener('mousedown',  this.mouseDownWithData);
      this.thumbElement.addEventListener('dragstart', this.handlePointerElementDragStart);


  }




  mouseDown(  isVertical: boolean,isRange: boolean, event: MouseEvent, ) {
      event.preventDefault();
      this.shiftX = event.clientX - this.thumbElement.getBoundingClientRect().left - this.thumbElement.offsetWidth/2;

      this.mouseMoveWithData = this.onMouseMove.bind(this, isVertical, event);
      document.addEventListener('mousemove', this.mouseMoveWithData);
      this.mouseUpWithData = this.onMouseUp.bind(null,  this.mouseUpWithData, this.mouseMoveWithData);
      document.addEventListener('mouseup', this.mouseUpWithData);
      document.addEventListener('dragstart', this.handlePointerElementDragStart);
    

  }

  public onMouseMove(  isVertical:boolean,isRange:boolean, event: MouseEvent, ) {
    

    if (isVertical) {
      const currentTarget = event.target as HTMLTextAreaElement;

      this.newTop = event.clientY - this.shiftY - this.pathElement.getBoundingClientRect().top;



      if (this.newTop < 0) {
        this.newTop = 0;
      }
      let rightEdge = this.pathElement.offsetHeight - this.thumbElement.offsetHeight + this.thumbElement.offsetHeight;
  
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
      let rightEdge = this.pathElement.offsetWidth - this.thumbElement.offsetWidth + this.thumbElement.offsetWidth;
  
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

export { ThumbView };