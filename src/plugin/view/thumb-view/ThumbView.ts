import bind from 'bind-decorator';
import TipView from '../tip-view/TipView';
import EventObserver from '../../event-observer/EventObserver';
import { calculateToPercents } from '../formulas';
import { Axis, SliderOptions } from '../../types';

interface PositionTypes {
  position: number;
  pointerToMove?: ThumbView;
}

class ThumbView {
  combinedTip:TipView | null = null;

  tip:TipView;

  thumbElement: HTMLElement = document.createElement('div');

  private shift: number | null = null;

  private newPosition: number | null = null;

  testPosition: number | null = null;

  pathElement: HTMLElement;

  observer = new EventObserver<PositionTypes>();

  axis:Axis;

  options: Required<SliderOptions>;

  constructor(pathElement: HTMLElement, options: Required<SliderOptions>, typeOfPointer: string) {
    this.options = options;
    this.pathElement = pathElement;
    this.tip = new TipView();
    this.createTemplate(typeOfPointer);
    this.axis = {
      direction: 'left',
      eventClientOrientation: 'clientY',
      offsetParameter: 'offsetHeight',
      styleOrientation: 'height',
    };
  }

  updatePointerPosition(newPosition: number, options: Required<SliderOptions>) {
    this.testPosition = newPosition;
    this.options = options;
    this.axis.direction = this.options.isVertical ? 'top' : 'left';
    this.axis.eventClientOrientation = this.options.isVertical
      ? 'clientY'
      : 'clientX';
    this.axis.offsetParameter = this.options.isVertical
      ? 'offsetHeight'
      : 'offsetWidth';
    this.axis.styleOrientation = this.options.isVertical ? 'height' : 'width';
    this.thumbElement.style[this.axis.direction] = `${newPosition}%`;
  }

  @bind
  updateEventListeners() {
    this.removeEventListeners();
    this.thumbElement.addEventListener('mousedown', this.handleThumbElementMouseDown);
    this.thumbElement.addEventListener(
      'dragstart',
      this.handleThumbElementDragStart,
    );
  }

  private createTemplate(typeOFPointer:string) {
    this.thumbElement.classList.add('js-bimkon-slider__thumb');
    this.thumbElement.append(this.tip.tipElement);
    if (typeOFPointer === 'fromValuePointer') {
      this.combinedTip = new TipView();
      this.combinedTip.tipElement.classList.add('js-bimkon-slider__tip_total');
      this.combinedTip.hide();
      this.thumbElement.append(this.combinedTip.tipElement);
    }
  }

  @bind
  private removeEventListeners() {
    this.thumbElement.removeEventListener('mousedown', this.handleThumbElementMouseDown);
    this.thumbElement.removeEventListener(
      'dragstart',
      this.handleThumbElementDragStart,
    );
  }

  @bind
  private handleThumbElementMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.shift = event[this.axis.eventClientOrientation]
      - this.thumbElement.getBoundingClientRect()[this.axis.direction]
      - this.thumbElement[this.axis.offsetParameter] / 2;
    document.addEventListener('mousemove', this.handleDocumentMouseMove);
    document.addEventListener('mouseup', this.handleDocumentMouseUp);
    document.addEventListener('dragstart', this.handleThumbElementDragStart);
  }

  @bind
  private handleDocumentMouseMove(event: MouseEvent) {
    event.preventDefault();
    if (this.shift !== null) {
      this.newPosition = event[this.axis.eventClientOrientation]
      - this.shift
      - this.pathElement.getBoundingClientRect()[this.axis.direction];
    }
    if (this.newPosition !== null) {
      if (this.newPosition < 0) {
        this.newPosition = 0;
      }
      const rightEdge = this.pathElement[this.axis.offsetParameter]
        - this.thumbElement[this.axis.offsetParameter]
        + this.thumbElement[this.axis.offsetParameter];

      if (this.newPosition > rightEdge) {
        this.newPosition = rightEdge;
      }

      this.dispatchThumbPosition({
        positionInPixels: this.newPosition,
        isVertical: this.options.isVertical,
      });
    }
  }

  @bind
  private handleDocumentMouseUp() {
    document.removeEventListener('mouseup', this.handleDocumentMouseUp);
    document.removeEventListener('mousemove', this.handleDocumentMouseMove);
    document.removeEventListener(
      'dragstart',
      this.handleThumbElementDragStart,
    );
  }

  private handleThumbElementDragStart() {
    return false;
  }

  private dispatchThumbPosition(data: {
    positionInPixels: number;
    isVertical: boolean;
  }) {
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

export default ThumbView;
