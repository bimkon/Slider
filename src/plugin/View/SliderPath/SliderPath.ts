/* eslint-disable no-restricted-globals */
import bind from 'bind-decorator';
import RangePathLine from '../RangePathLine/RangePathLine';
import ThumbView from '../ThumbView/ThumbView';
import Scale from '../Scale/Scale';
import EventObserver from '../../EventObserver/EventObserver';
import SliderOptions from '../../SliderOptions';
import {
  calculateToPercents,
  calculateToPixels,
  calculateValueToPercents,
} from '../formulas';

interface PositionTypes {
  position: number;
  pointerToMove: string;
}

class SliderPath {
  observer = new EventObserver<PositionTypes>();

  pathElement: HTMLElement;

  rangePathLine: RangePathLine;

  thumbElement: HTMLElement;

  scale: Scale;

  valueToPercents: number;

  percentsToPixels: number;

  fromValuePointer: ThumbView;

  toValuePointer: ThumbView;

  shift: number;

  newPosition: number;

  newPositionInPercents: number;

  midBetweenPointers: number;

  axis: Record<string, any> = {};

  options: SliderOptions;

  constructor() {
    this.axis = {};
    this.createTemplate();
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

  initRangeSlider() {
    this.toValuePointer = new ThumbView(this.pathElement);
    this.pathElement.append(this.toValuePointer.thumbElement);
    this.fromValuePointer.observer.subscribe(this.dispatchThumbPosition);
    this.toValuePointer.observer.subscribe(this.dispatchThumbPosition);
  }

  subscribeToThumb() {
    this.fromValuePointer.observer.subscribe(this.dispatchThumbPosition);
  }

  setPointerPosition(data: {
    fromInPercents: number;
    toInPercents: number;
    options: SliderOptions;
  }) {
    const { fromInPercents, toInPercents, options } = data;
    this.options = options;
    this.axis.direction = this.options.isVertical ? 'top' : 'left';
    this.axis.eventClientOrientation = this.options.isVertical
      ? 'clientY'
      : 'clientX';
    this.axis.offsetParameter = this.options.isVertical
      ? 'offsetHeight'
      : 'offsetWidth';
    this.axis.styleOrientation = this.options.isVertical ? 'height' : 'width';
    this.fromValuePointer.updatePointerPosition(fromInPercents, options);
    if (this.toValuePointer) this.toValuePointer.updatePointerPosition(toInPercents, options);
    this.updateRangeLine(fromInPercents, toInPercents);
  }

  @bind
  updateRangeLine(fromInPercents: number, toInPercents: number) {
    if (this.options.isRange) {
      this.rangePathLine.pathLine.style[
        this.axis.direction
      ] = `${fromInPercents}%`;
      this.rangePathLine.pathLine.style[this.axis.styleOrientation] = `${
        toInPercents - fromInPercents
      }%`;
    } else {
      this.rangePathLine.pathLine.style[this.axis.direction] = '0%';
      this.rangePathLine.pathLine.style[
        this.axis.styleOrientation
      ] = `${fromInPercents}%`;
    }
  }

  updateEventListenersToScale() {
    this.scale.scale.removeEventListener('click', this.handleScaleClick);
    this.scale.scale.addEventListener('click', this.handleScaleClick);
  }

  @bind
  handleScaleClick(event: MouseEvent) {
    const target = event.target as HTMLTextAreaElement;
    const scaleValue = Number(target.textContent);
    if (target.classList.contains('bimkon-slider__scale')) return;
    this.valueToPercents = calculateValueToPercents(
      scaleValue,
      this.options.min,
      this.options.max,
    );
    this.percentsToPixels = calculateToPixels({
      valueInPercents: this.valueToPercents,
      pathElement: this.pathElement,
      isVertical: this.options.isVertical,
    });
    this.newPositionInPercents = calculateToPercents({
      valueInPixels: this.percentsToPixels,
      pathElement: this.pathElement,
      isVertical: this.options.isVertical,
    });
    this.dispatchThumbPositionOnScaleClick();
  }

  @bind
  updateEventListenersToBar() {
    this.removeEventListenersFromBar();
    this.bindEventListenersToBar();
  }

  @bind
  bindEventListenersToBar() {
    this.rangePathLine.emptyBar.addEventListener('mousedown', this.handleRangePathLineMouseDown);
    this.rangePathLine.emptyBar.addEventListener(
      'dragstart',
      this.handleRangePathLineDragStart,
    );
  }

  @bind
  removeEventListenersFromBar() {
    this.rangePathLine.emptyBar.removeEventListener(
      'mousedown',
      this.handleRangePathLineMouseDown,
    );
    this.rangePathLine.emptyBar.removeEventListener(
      'dragstart',
      this.handleRangePathLineDragStart,
    );
  }

  @bind
  handleRangePathLineMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.shift = 0;
    this.newPosition = this.calculateNewPosition();
    this.newPositionInPercents = calculateToPercents({
      valueInPixels: this.newPosition,
      pathElement: this.pathElement,
      isVertical: this.options.isVertical,
    });
    this.dispatchThumbPositionOnScaleClick();
    document.addEventListener('mousemove', this.handleDocumentMouseMove);
    document.addEventListener('mouseup', this.handleDocumentMouseUp);
    document.addEventListener('dragstart', this.handleRangePathLineDragStart);
  }

  @bind
  handleDocumentMouseMove(event: MouseEvent) {
    event.preventDefault();
    this.dispatchThumbOnMouseMove();
  }

  @bind
  handleDocumentMouseUp() {
    document.removeEventListener('mouseup', this.handleDocumentMouseUp);
    document.removeEventListener('mousemove', this.handleDocumentMouseMove);
    document.removeEventListener(
      'dragstart',
      this.handleRangePathLineDragStart,
    );
  }

  dispatchThumbOnMouseMove() {
    const rightEdge = this.pathElement[this.axis.offsetParameter]
      - this.fromValuePointer.thumbElement[this.axis.offsetParameter]
      + this.fromValuePointer.thumbElement[this.axis.offsetParameter];
    if (this.options.isRange) {
      this.newPosition = this.calculateNewPosition();
      if (this.newPosition < 0) {
        this.newPosition = 0;
      }
      if (this.newPosition > rightEdge) {
        this.newPosition = rightEdge;
      }

      this.midBetweenPointers = this.calculateMidBetweenPointers();

      const newPositionSmallerThenMidBetweenPointers = this.newPosition < this.midBetweenPointers
        && this.fromValuePointer.thumbElement.classList.contains(
          'bimkon-slider__thumb_selected',
        );
      const newPositionBiggerThenMidBetweenPointers = this.newPosition > this.midBetweenPointers
        && this.toValuePointer.thumbElement.classList.contains(
          'bimkon-slider__thumb_selected',
        );

      if (newPositionSmallerThenMidBetweenPointers) {
        this.dispatchThumbPosition({
          position: calculateToPercents({
            valueInPixels: this.newPosition,
            pathElement: this.pathElement,
            isVertical: this.options.isVertical,
          }),
          pointerToMove: this.fromValuePointer,
        });
      }
      if (newPositionBiggerThenMidBetweenPointers) {
        this.dispatchThumbPosition({
          position: calculateToPercents({
            valueInPixels: this.newPosition,
            pathElement: this.pathElement,
            isVertical: this.options.isVertical,
          }),
          pointerToMove: this.toValuePointer,
        });
      }
    } else {
      this.newPosition = this.calculateNewPosition();
      if (this.newPosition < 0) {
        this.newPosition = 0;
      }

      if (this.newPosition > rightEdge) {
        this.newPosition = rightEdge;
      }
      this.dispatchThumbPosition({
        position: calculateToPercents({
          valueInPixels: this.newPosition,
          pathElement: this.pathElement,
          isVertical: this.options.isVertical,
        }),
        pointerToMove: this.fromValuePointer,
      });
    }
  }

  dispatchThumbPositionOnScaleClick() {
    if (this.options.isRange) {
      this.midBetweenPointers = this.calculateMidBetweenPointers();
      this.newPosition = this.calculateNewPosition();

      if (this.newPosition > this.midBetweenPointers) {
        this.dispatchThumbPosition({
          position: this.newPositionInPercents,
          pointerToMove: this.toValuePointer,
        });
      } else {
        this.dispatchThumbPosition({
          position: this.newPositionInPercents,
          pointerToMove: this.fromValuePointer,
        });
      }
    } else {
      this.dispatchThumbPosition({
        position: this.newPositionInPercents,
        pointerToMove: this.fromValuePointer,
      });
    }
  }

  handleRangePathLineDragStart() {
    return false;
  }

  updateEventListenersToThumb(isRange: boolean) {
    this.fromValuePointer.updateEventListeners();
    if (isRange) this.toValuePointer.updateEventListeners();
  }

  @bind
  dispatchThumbPosition(data: { position: number; pointerToMove?: ThumbView }) {
    const { position, pointerToMove } = data;
    this.updateZIndex(pointerToMove);
    this.observer.broadcast({
      position,
      pointerToMove: this.checkPointerType(pointerToMove),
    });
  }

  checkPointerType(pointer: ThumbView) {
    switch (pointer) {
      case this.fromValuePointer:
        return 'fromValue';
      case this.toValuePointer:
        return 'toValue';
      default:
        return null;
    }
  }

  private updateZIndex(pointer: ThumbView) {
    switch (pointer) {
      case this.fromValuePointer:
        if (this.toValuePointer) {
          this.toValuePointer.thumbElement.classList.remove(
            'bimkon-slider__thumb_selected',
          );
        }
        break;
      case this.toValuePointer:
        this.fromValuePointer.thumbElement.classList.remove(
          'bimkon-slider__thumb_selected',
        );
        break;
      default:
    }
    pointer.thumbElement.classList.add('bimkon-slider__thumb_selected');
  }

  calculateMidBetweenPointers() {
    const calculatedValue = (this.toValuePointer.thumbElement.getBoundingClientRect()[
      this.axis.direction
    ]
        - this.fromValuePointer.thumbElement.getBoundingClientRect()[
          this.axis.direction
        ])
        / 2
      + this.fromValuePointer.thumbElement.getBoundingClientRect()[
        this.axis.direction
      ]
      - this.pathElement.getBoundingClientRect()[this.axis.direction]
      + this.fromValuePointer.thumbElement[this.axis.offsetParameter] / 2;
    return calculatedValue;
  }

  calculateNewPosition() {
    const newPosition = event[this.axis.eventClientOrientation]
      - this.pathElement.getBoundingClientRect()[this.axis.direction];
    return newPosition;
  }
}

export default SliderPath;
