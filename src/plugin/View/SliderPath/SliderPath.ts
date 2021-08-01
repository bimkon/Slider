import bind from 'bind-decorator';
import { RangePathLine } from '../RangePathLine/RangePathLine';
import { ThumbView } from '../ThumbView/ThumbView';
import { Scale } from '../Scale/Scale';
import { EventObserver } from '../../EventObserver/EventObserver';
import { SliderOptions } from '../../SliderOptions';
import { calculateToPercents, calculateToPixels, calculateValueToPercents } from '../formuls';

interface PositionTypes{
  position: number;
  pointerToMove: string;
}

class SliderPath {
  observer = new EventObserver<PositionTypes>();

  pathElement: HTMLElement;

  rangePathLine: RangePathLine;

  thumbElement: HTMLElement;

  left: number;

  thumbCoords: number;

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

  showNumberWithData: EventListenerOrEventListenerObject;

  newPositionInPercents:number;

  midBetweenPointers: number;

  axis: Record<string, any> = {};

  constructor(options:SliderOptions) {
    const { isVertical } = options;
    this.createTemplate();
    this.axis = {};
    this.axis.direction = isVertical ? 'top' : 'left';
    this.axis.eventClientOrientation = isVertical ? 'clientY' : 'clientX';
    this.axis.offsetParameter = isVertical ? 'offsetHeight' : 'offsetWidth';
  }

  createTemplate() {
    this.pathElement = document.createElement('div');
    this.pathElement.classList.add('js-bimkon-slider__path');
    this.rangePathLine = new RangePathLine();
    this.pathElement.append(this.rangePathLine.pathLine);
    this.pathElement.append(this.rangePathLine.emptyBar);
    this.fromValuePointer = new ThumbView(this.pathElement);
    this.pathElement.append(this.fromValuePointer.thumbElement);
  }

  makeRange(numberOfStrokes: number) {
    this.toValuePointer = new ThumbView(this.pathElement);
    this.pathElement.append(this.toValuePointer.thumbElement);
    this.fromValuePointer.observer.subscribe(this.dispatchThumbPosition);
    this.toValuePointer.observer.subscribe(this.dispatchThumbPosition);
    this.scale = new Scale(numberOfStrokes);
    this.pathElement.append(this.scale.scale);
  }

  makeSingle(numberOfStrokes: number) {
    this.fromValuePointer.observer.subscribe(this.dispatchThumbPosition);
    this.scale = new Scale(numberOfStrokes);
    this.pathElement.append(this.scale.scale);
  }

  setPointerPosition(data: {
    fromInPercents: number;
    toInPercents: number;
    options: SliderOptions,
  }) {
    const { fromInPercents, toInPercents, options } = data;
    this.fromValuePointer.updatePointerPosition(fromInPercents, options);
    if (this.toValuePointer) this.toValuePointer.updatePointerPosition(toInPercents, options);
    this.updateRangeLine(options, fromInPercents, toInPercents);
  }

  @bind
  updateRangeLine(options: SliderOptions, fromInPercents: number, toInPercents: number) {
    const { isVertical, isRange } = options;
    if (isVertical) {
      if (isRange) {
        this.rangePathLine.pathLine.style.top = `${fromInPercents}%`;
        this.rangePathLine.pathLine.style.height = `${toInPercents - fromInPercents}%`;
      } else {
        this.rangePathLine.pathLine.style.top = '0%';
        this.rangePathLine.pathLine.style.height = `${fromInPercents}%`;
      }
    } else if (isRange) {
      this.rangePathLine.pathLine.style.left = `${fromInPercents}%`;
      this.rangePathLine.pathLine.style.width = `${toInPercents - fromInPercents}%`;
    } else {
      this.rangePathLine.pathLine.style.left = '0%';
      this.rangePathLine.pathLine.style.width = `${fromInPercents}%`;
    }
  }

  updateEventListenersToScale(min:number, max:number, isVertical:boolean, isRange:boolean) {
    this.removeEventListenersToScale();
    this.bindEventListenersToScale(min, max, isVertical, isRange);
  }

  removeEventListenersToScale() {
    this.scale.scale.removeEventListener('click', this.showNumberWithData);
  }

  bindEventListenersToScale(min:number, max:number, isVertical:boolean, isRange:boolean) {
    // eslint-disable-next-line no-restricted-globals
    this.showNumberWithData = this.showNumber.bind(event, min, max, isVertical, isRange);
    this.scale.scale.addEventListener('click', this.showNumberWithData);
  }

  @bind
  showNumber(min: number, max: number, isVertical:boolean, isRange:boolean, event:MouseEvent) {
    const target = event.target as HTMLTextAreaElement;
    const scaleValue = Number(target.textContent);
    if (target.classList.contains('js-bimkon-slider__scale')) return;
    this.valueToPercents = calculateValueToPercents(scaleValue, min, max);
    this.percentsToPixels = calculateToPixels({
      valueInPercents: this.valueToPercents, pathElement: this.pathElement, isVertical,
    });
    if (isVertical) {
      if (isRange) {
        this.midBetweenPointers = ((
          this.toValuePointer.thumbElement.getBoundingClientRect()[this.axis.direction]
        - this.fromValuePointer.thumbElement.getBoundingClientRect()[this.axis.direction]) / 2)
        + this.fromValuePointer.thumbElement.getBoundingClientRect()[this.axis.direction]
        - this.pathElement.getBoundingClientRect()[this.axis.direction]
        + this.fromValuePointer.thumbElement[this.axis.offsetParameter] / 2;
        this.newTop = event[this.axis.eventClientOrientation]
        - this.pathElement.getBoundingClientRect()[this.axis.direction];
        if (this.newTop < this.midBetweenPointers) {
          this.dispatchThumbPosition({
            position: calculateToPercents({
              valueInPixels: this.percentsToPixels,
              pathElement: this.pathElement,
              isVertical,
            }),
            pointerToMove: this.fromValuePointer,
          });
        }
        if (this.newTop > this.midBetweenPointers) {
          this.dispatchThumbPosition({
            position: calculateToPercents({
              valueInPixels: this.percentsToPixels, pathElement: this.pathElement, isVertical,
            }),
            pointerToMove: this.toValuePointer,
          });
        } else {
          this.dispatchThumbPosition({
            position: calculateToPercents({
              valueInPixels: this.percentsToPixels, pathElement: this.pathElement, isVertical,
            }),
            pointerToMove: this.fromValuePointer,
          });
        }
      } else {
        this.dispatchThumbPosition({
          position: calculateToPercents({
            valueInPixels: this.percentsToPixels, pathElement: this.pathElement, isVertical,
          }),
          pointerToMove: this.fromValuePointer,
        });
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (isRange) {
        this.midBetweenPointers = ((this.toValuePointer.thumbElement.getBoundingClientRect().left
        - this.fromValuePointer.thumbElement.getBoundingClientRect().left) / 2)
        + this.fromValuePointer.thumbElement.getBoundingClientRect().left
        - this.pathElement.getBoundingClientRect().left
        + this.fromValuePointer.thumbElement[this.axis.offsetParameter] / 2;
        this.newLeft = event.clientX - this.pathElement.getBoundingClientRect().left;
        if (this.newLeft < this.midBetweenPointers) {
          this.dispatchThumbPosition({
            position: calculateToPercents({
              valueInPixels: this.percentsToPixels,
              pathElement: this.pathElement,
              isVertical,
            }),
            pointerToMove: this.fromValuePointer,
          });
        }
        if (this.newLeft > this.midBetweenPointers) {
          this.dispatchThumbPosition({
            position: calculateToPercents({
              valueInPixels: this.percentsToPixels, pathElement: this.pathElement, isVertical,
            }),
            pointerToMove: this.toValuePointer,
          });
        } else {
          this.dispatchThumbPosition({
            position: calculateToPercents({
              valueInPixels: this.percentsToPixels, pathElement: this.pathElement, isVertical,
            }),
            pointerToMove: this.fromValuePointer,
          });
        }
      } else {
        this.dispatchThumbPosition({
          position: calculateToPercents({
            valueInPixels: this.percentsToPixels, pathElement: this.pathElement, isVertical,
          }),
          pointerToMove: this.fromValuePointer,
        });
      }
    }
  }

  updateEventListenersToBar(isVertical:boolean, isRange:boolean) {
    this.removeEventListenersToBar();
    this.bindEventListenersToBar(isVertical, isRange);
  }

  bindEventListenersToBar(isVertical:boolean, isRange:boolean) {
    this.mouseDownWithData = this.mouseDown.bind(this, isVertical, isRange);
    this.rangePathLine.emptyBar.addEventListener('mousedown', this.mouseDownWithData);
    this.rangePathLine.emptyBar.addEventListener('dragstart', this.handlePointerElementDragStart);
  }

  removeEventListenersToBar() {
    this.rangePathLine.emptyBar.removeEventListener('mousedown', this.mouseDownWithData);
    this.rangePathLine.emptyBar.removeEventListener('dragstart', this.handlePointerElementDragStart);
  }

  mouseDown(isVertical: boolean, isRange: boolean, event: MouseEvent) {
    event.preventDefault();
    this.shiftY = 0;
    this.newTop = event[this.axis.eventClientOrientation]
      - this.pathElement.getBoundingClientRect()[this.axis.direction];
    this.newPositionInPercents = calculateToPercents({
      valueInPixels: this.newTop,
      pathElement: this.pathElement,
      isVertical,
    });
    if (isRange) {
      this.midBetweenPointers = ((
        this.toValuePointer.thumbElement.getBoundingClientRect()[this.axis.direction]
         - this.fromValuePointer.thumbElement.getBoundingClientRect()[this.axis.direction]) / 2)
         + this.fromValuePointer.thumbElement.getBoundingClientRect()[this.axis.direction]
         - this.pathElement.getBoundingClientRect()[this.axis.direction]
         + this.fromValuePointer.thumbElement[this.axis.offsetParameter] / 2;

      if (this.newTop < this.midBetweenPointers) {
        this.dispatchThumbPosition({
          position: this.newPositionInPercents, pointerToMove: this.fromValuePointer,
        });
      }
      if (this.newTop > this.midBetweenPointers) {
        this.dispatchThumbPosition({
          position: this.newPositionInPercents,
          pointerToMove: this.toValuePointer,
        });
      }
    } else {
      this.dispatchThumbPosition({
        position: this.newPositionInPercents, pointerToMove: this.fromValuePointer,
      });
    }
    this.mouseMoveWithData = this.onMouseMove.bind(this, isVertical, isRange);
    document.addEventListener('mousemove', this.mouseMoveWithData);
    this.mouseUpWithData = this.onMouseUp.bind(
      null, this.mouseUpWithData, this.mouseMoveWithData,
    );
    document.addEventListener('mouseup', this.mouseUpWithData);
    document.addEventListener('dragstart', this.handlePointerElementDragStart);
  }

  onMouseMove(isVertical:boolean, isRange:boolean, event: MouseEvent) {
    if (isRange) {
      this.newTop = event[this.axis.eventClientOrientation] - this.shiftY
        - this.pathElement.getBoundingClientRect()[this.axis.direction];
      if (this.newTop < 0) {
        this.newTop = 0;
      }
      const rightEdge = this.pathElement[this.axis.offsetParameter]
         - this.fromValuePointer.thumbElement[this.axis.offsetParameter]
         + this.fromValuePointer.thumbElement[this.axis.offsetParameter];

      if (this.newTop > rightEdge) {
        this.newTop = rightEdge;
      }

      this.midBetweenPointers = ((
        this.toValuePointer.thumbElement.getBoundingClientRect()[this.axis.direction]
         - this.fromValuePointer.thumbElement.getBoundingClientRect()[this.axis.direction]) / 2)
         + this.fromValuePointer.thumbElement.getBoundingClientRect()[this.axis.direction]
         - this.pathElement.getBoundingClientRect()[this.axis.direction]
         + this.fromValuePointer.thumbElement[this.axis.offsetParameter] / 2;
      if (this.newTop < this.midBetweenPointers && this.fromValuePointer.thumbElement.classList.contains('js-bimkon-slider__thumb_selected')) this.dispatchThumbPosition({ position: calculateToPercents({ valueInPixels: this.newTop, pathElement: this.pathElement, isVertical }), pointerToMove: this.fromValuePointer });
      if (this.newTop > this.midBetweenPointers && this.toValuePointer.thumbElement.classList.contains('js-bimkon-slider__thumb_selected')) this.dispatchThumbPosition({ position: calculateToPercents({ valueInPixels: this.newTop, pathElement: this.pathElement, isVertical }), pointerToMove: this.toValuePointer });
    } else {
      this.newTop = event[this.axis.eventClientOrientation] - this.shiftY
      - this.pathElement.getBoundingClientRect()[this.axis.direction];
      if (this.newTop < 0) {
        this.newTop = 0;
      }
      const rightEdge = this.pathElement.offsetHeight
         - this.fromValuePointer.thumbElement[this.axis.offsetParameter]
         + this.fromValuePointer.thumbElement[this.axis.offsetParameter];

      if (this.newTop > rightEdge) {
        this.newTop = rightEdge;
      }
      this.dispatchThumbPosition({
        position: calculateToPercents({
          valueInPixels: this.newTop, pathElement: this.pathElement, isVertical,
        }),
        pointerToMove: this.fromValuePointer,
      });
    }
  }

  onMouseUp(mouseUpWithData: EventListenerOrEventListenerObject,
    mouseMoveWithData: EventListenerOrEventListenerObject) {
    document.removeEventListener('mouseup', mouseUpWithData);
    document.removeEventListener('mousemove', mouseMoveWithData);
    // document.removeEventListener('dragstart', this.handlePointerElementDragStart);
  }

  handlePointerElementDragStart() {
    return false;
  }

  bindEventListeners(isVertical:boolean, isRange:boolean) {
    this.fromValuePointer.updateEventListeners(isVertical, isRange);
    if (isRange) this.toValuePointer.updateEventListeners(isVertical, isRange);
  }

  @bind
  dispatchThumbPosition(data: { position: number, pointerToMove?: ThumbView, }) {
    const { position, pointerToMove } = data;
    this.updateZIndex(pointerToMove);
    this.observer.broadcast({
      position,
      pointerToMove: this.checkPointerType(pointerToMove),
    });
  }

  checkPointerType(pointer: ThumbView) {
    switch (pointer) {
      case this.fromValuePointer: return 'fromValue';
      case this.toValuePointer: return 'toValue';
      default: return null;
    }
  }

  private updateZIndex(pointer: ThumbView) {
    switch (pointer) {
      case this.fromValuePointer:
        if (this.toValuePointer) this.toValuePointer.thumbElement.classList.remove('js-bimkon-slider__thumb_selected');
        break;
      case this.toValuePointer:
        this.fromValuePointer.thumbElement.classList.remove('js-bimkon-slider__thumb_selected');
        break;
      default:
    }
    pointer.thumbElement.classList.add('js-bimkon-slider__thumb_selected');
  }
}

export { SliderPath };
export default { SliderPath };
