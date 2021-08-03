import { TipView } from '../TipView/TipView';
import { SliderOptions } from '../../SliderOptions';
import { EventObserver } from '../../EventObserver/EventObserver';
import { calculateToPercents } from '../formuls';

interface PositionTypes{
  position: number;
  pointerToMove?: ThumbView;
}

class ThumbView {
  tip: TipView;

  thumbElement: HTMLElement;

  mouseDownWithData: EventListenerOrEventListenerObject;

  mouseMoveWithData: EventListenerOrEventListenerObject;

  mouseUpWithData: EventListenerOrEventListenerObject;

  shiftX: number;

  shiftY: number;

  newLeft: number;

  newTop: number;

  position: number;

  public pathElement: HTMLElement;

  public observer = new EventObserver<PositionTypes>();

  constructor(pathElement: HTMLElement) {
    this.pathElement = pathElement;
    this.createTemplate();
  }

  createTemplate() {
    this.thumbElement = document.createElement('div');
    this.thumbElement.classList.add('bimkon-slider__thumb');
    this.tip = new TipView();
    this.thumbElement.append(this.tip.tipElement);
  }

  updatePointerPosition(newPosition:number, options?: SliderOptions) {
    this.position = newPosition;
    const { isVertical } = options;
    if (isVertical) {
      this.thumbElement.style.top = `${newPosition}%`;
    } else {
      this.thumbElement.style.left = `${newPosition}%`;
    }
  }

  updateEventListeners(isVertical:boolean, isRange:boolean) {
    this.removeEventListeners();
    this.bindEventListeners(isVertical, isRange);
  }

  bindEventListeners(isVertical:boolean, isRange:boolean) {
    this.mouseDownWithData = this.mouseDown.bind(this, isVertical, isRange);
    this.thumbElement.addEventListener('mousedown', this.mouseDownWithData);
    this.thumbElement.addEventListener('dragstart', this.handlePointerElementDragStart);
  }

  private removeEventListeners() {
    this.thumbElement.removeEventListener('mousedown', this.mouseDownWithData);
    this.thumbElement.removeEventListener('dragstart', this.handlePointerElementDragStart);
  }

  mouseDown(isVertical: boolean, isRange: boolean, event: MouseEvent) {
    event.preventDefault();
    if (isVertical) {
      this.shiftY = event.clientY - this.thumbElement.getBoundingClientRect().top
       - this.thumbElement.offsetHeight / 2;
      this.mouseMoveWithData = this.onMouseMove.bind(this, isVertical, event);
      document.addEventListener('mousemove', this.mouseMoveWithData);
      this.mouseUpWithData = this.onMouseUp.bind(null, this.mouseUpWithData,
        this.mouseMoveWithData);
      document.addEventListener('mouseup', this.mouseUpWithData);
      document.addEventListener('dragstart', this.handlePointerElementDragStart);
    } else {
      this.shiftX = event.clientX - this.thumbElement.getBoundingClientRect().left
       - this.thumbElement.offsetWidth / 2;
      this.mouseMoveWithData = this.onMouseMove.bind(this, isVertical, event);
      document.addEventListener('mousemove', this.mouseMoveWithData);
      this.mouseUpWithData = this.onMouseUp.bind(null, this.mouseUpWithData,
        this.mouseMoveWithData);
      document.addEventListener('mouseup', this.mouseUpWithData);
      document.addEventListener('dragstart', this.handlePointerElementDragStart);
    }
  }

  onMouseMove(isVertical:boolean, isRange:boolean, event: MouseEvent) {
    if (isVertical) {
      this.newTop = event.clientY - this.shiftY - this.pathElement.getBoundingClientRect().top;
      if (this.newTop < 0) {
        this.newTop = 0;
      }
      const rightEdge = this.pathElement.offsetHeight
       - this.thumbElement.offsetHeight + this.thumbElement.offsetHeight;

      if (this.newTop > rightEdge) {
        this.newTop = rightEdge;
      }
      this.dispatchThumbPosition({ positionInPixels: this.newTop, isVertical });
    } else {
      this.newLeft = event.clientX - this.shiftX - this.pathElement.getBoundingClientRect().left;
      if (this.newLeft < 0) {
        this.newLeft = 0;
      }
      const rightEdge = this.pathElement.offsetWidth
      - this.thumbElement.offsetWidth + this.thumbElement.offsetWidth;

      if (this.newLeft > rightEdge) {
        this.newLeft = rightEdge;
      }

      this.dispatchThumbPosition({ positionInPixels: this.newLeft });
    }
  }

  onMouseUp(mouseUpWithData: EventListenerOrEventListenerObject,
    mouseMoveWithData: EventListenerOrEventListenerObject) {
    document.removeEventListener('mouseup', mouseUpWithData);
    document.removeEventListener('mousemove', mouseMoveWithData);
    // document.removeEventListener('dragstart', this.handlePointerElementDragStart);
  }

  private handlePointerElementDragStart() {
    return false;
  }

  dispatchThumbPosition(data: { positionInPixels: number, isVertical?:boolean }) {
    const { positionInPixels, isVertical } = data;
    this.observer.broadcast({
      position: calculateToPercents({
        valueInPixels: positionInPixels,
        pathElement: this.pathElement,
        isVertical,
      }),
      pointerToMove: this,

    });
  }
}

export { ThumbView };

export default ThumbView;
