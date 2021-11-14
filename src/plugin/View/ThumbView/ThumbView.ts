import bind from 'bind-decorator';
import TipView from '../TipView/TipView';
import SliderOptions from '../../SliderOptions';
import EventObserver from '../../EventObserver/EventObserver';
import { calculateToPercents } from '../formulas';

interface PositionTypes {
  position: number;
  pointerToMove?: ThumbView;
}

class ThumbView {
  tip!: TipView;

  thumbElement!: HTMLElement | null;

  shift!: number;

  newPosition!: number;

  testPosition!: number;

  pathElement: HTMLElement;

  observer = new EventObserver<PositionTypes>();

  axis: Record<string, any> = {};

  options!: SliderOptions | undefined;

  constructor(pathElement: HTMLElement) {
    this.pathElement = pathElement;
    this.createTemplate();
    this.axis = {};
  }

  createTemplate() {
    this.thumbElement = document.createElement('div');
    this.thumbElement.classList.add('js-bimkon-slider__thumb');
    this.tip = new TipView();
    this.thumbElement.append(this.tip.tipElement);
  }

  updatePointerPosition(newPosition: number, options?: SliderOptions) {
    this.testPosition = newPosition;
    this.options = options;
    this.axis.direction = this.options!.isVertical ? 'top' : 'left';
    this.axis.eventClientOrientation = this.options!.isVertical
      ? 'clientY'
      : 'clientX';
    this.axis.offsetParameter = this.options!.isVertical
      ? 'offsetHeight'
      : 'offsetWidth';
    this.axis.styleOrientation = this.options!.isVertical ? 'height' : 'width';
    this.thumbElement!.style[this.axis.direction] = `${newPosition}%`;
  }

  @bind
  updateEventListeners() {
    this.removeEventListeners();
    this.thumbElement!.addEventListener('mousedown', this.handleThumbElementMouseDown);
    this.thumbElement!.addEventListener(
      'dragstart',
      this.handleThumbElementDragStart,
    );
  }

  @bind
  private removeEventListeners() {
    this.thumbElement!.removeEventListener('mousedown', this.handleThumbElementMouseDown);
    this.thumbElement!.removeEventListener(
      'dragstart',
      this.handleThumbElementDragStart,
    );
  }

  @bind
  handleThumbElementMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.shift = event[this.axis.eventClientOrientation]
      - this.thumbElement!.getBoundingClientRect()[this.axis.direction]
      - this.thumbElement![this.axis.offsetParameter] / 2;
    document.addEventListener('mousemove', this.handleDocumentMouseMove);
    document.addEventListener('mouseup', this.handleDocumentMouseUp);
    document.addEventListener('dragstart', this.handleThumbElementDragStart);
  }

  @bind
  handleDocumentMouseMove(event: MouseEvent) {
    event.preventDefault();
    this.newPosition = event[this.axis.eventClientOrientation]
      - this.shift
      - this.pathElement.getBoundingClientRect()[this.axis.direction];
    if (this.newPosition < 0) {
      this.newPosition = 0;
    }
    const rightEdge = this.pathElement[this.axis.offsetParameter]
      - this.thumbElement![this.axis.offsetParameter]
      + this.thumbElement![this.axis.offsetParameter];

    if (this.newPosition > rightEdge) {
      this.newPosition = rightEdge;
    }
    this.dispatchThumbPosition({
      positionInPixels: this.newPosition,
      isVertical: this.options!.isVertical,
    });
  }

  @bind
  handleDocumentMouseUp() {
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

  dispatchThumbPosition(data: {
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
