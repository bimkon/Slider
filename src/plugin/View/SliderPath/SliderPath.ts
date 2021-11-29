/* eslint-disable no-restricted-globals */
import bind from 'bind-decorator';
import { Axis } from '../../types';
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

  pathElement: HTMLElement = document.createElement('div');

  rangePathLine: RangePathLine = new RangePathLine();

  thumbElement: HTMLElement | null = null;

  scale: Scale | null = null;

  valueToPercents: number | null = null;

  percentsToPixels: number | null = null;

  fromValuePointer: ThumbView | null = null;

  toValuePointer: ThumbView | null = null;

  shift: number | null = null;

  newPosition: number | null = null;

  newPositionInPercents: number | null = null;

  midBetweenPointers: number | null = null;

  axis: Axis;

  options: Required<SliderOptions> | null = null;

  target: EventTarget | null | string = null;

  targetText: string | null = null;

  constructor() {
    this.axis = {
      direction: 'left',
      eventClientOrientation: 'clientY',
      offsetParameter: 'offsetHeight',
      styleOrientation: 'height',
    };
    this.createTemplate();
  }

  createTemplate() {
    this.pathElement.classList.add('js-bimkon-slider__path');
    if (!(this.rangePathLine.pathLine instanceof Node)) return;
    this.pathElement.append(this.rangePathLine.pathLine);
    if (!(this.rangePathLine.emptyBar instanceof Node)) return;
    this.pathElement.append(this.rangePathLine.emptyBar);
    this.fromValuePointer = new ThumbView(this.pathElement);
    if (!(this.fromValuePointer.thumbElement instanceof Node)) return;
    this.pathElement.append(this.fromValuePointer.thumbElement);
  }

  initRangeSlider() {
    this.toValuePointer = new ThumbView(this.pathElement);
    if (!(this.toValuePointer.thumbElement instanceof Node)) return;
    this.pathElement.append(this.toValuePointer.thumbElement);
    if (this.fromValuePointer === null) return;
    this.fromValuePointer.observer.subscribe(this.dispatchThumbPosition);
    this.toValuePointer.observer.subscribe(this.dispatchThumbPosition);
  }

  subscribeToThumb() {
    if (this.fromValuePointer === null) return;
    this.fromValuePointer.observer.subscribe(this.dispatchThumbPosition);
  }

  setPointerPosition(data: {
    fromInPercents: number;
    toInPercents: number;
    options: Required<SliderOptions>;
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
    if (this.fromValuePointer === null) return;
    this.fromValuePointer.updatePointerPosition(fromInPercents, options);
    if (this.toValuePointer) this.toValuePointer.updatePointerPosition(toInPercents, options);
    this.updateRangeLine(fromInPercents, toInPercents);
  }

  @bind
  updateRangeLine(fromInPercents: number, toInPercents: number) {
    if (this.options === null) return;
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
    if (this.scale === null) return;
    this.scale.scale.removeEventListener('click', this.handleScaleClick);
    this.scale.scale.addEventListener('click', this.handleScaleClick);
  }

  @bind
  handleScaleClick(event: MouseEvent) {
    if (event.target instanceof HTMLElement) {
      this.targetText = event.target.textContent;
      this.target = event.target;
    }
    const scaleValue = Number(this.targetText);
    if (this.target instanceof HTMLElement) {
      if (this.target.classList.contains('js-bimkon-slider__scale')) return;
    }
    if (this.options === null) return;
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
    this.rangePathLine.emptyBar.addEventListener(
      'mousedown',
      this.handleRangePathLineMouseDown,
    );
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
    if (this.newPosition === null || this.options === null) return null;
    this.newPositionInPercents = calculateToPercents({
      valueInPixels: this.newPosition,
      pathElement: this.pathElement,
      isVertical: this.options.isVertical as boolean,
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
    if (this.fromValuePointer === null || this.fromValuePointer.thumbElement === null) return;
    const rightEdge = this.pathElement[this.axis.offsetParameter]
      - this.fromValuePointer.thumbElement[this.axis.offsetParameter]
      + this.fromValuePointer.thumbElement[this.axis.offsetParameter];
    if (this.options === null) return;
    if (this.options.isRange) {
      this.newPosition = this.calculateNewPosition();
      if (this.newPosition === null) return null;
      if (this.newPosition < 0) {
        this.newPosition = 0;
      }
      if (this.newPosition > rightEdge) {
        this.newPosition = rightEdge;
      }

      this.midBetweenPointers = this.calculateMidBetweenPointers();
      if (this.newPosition === null || this.fromValuePointer === null) return;
      if (this.midBetweenPointers === null) return;
      const newPositionSmallerThenMidBetweenPointers = this.newPosition < this.midBetweenPointers
        && this.fromValuePointer.thumbElement.classList.contains(
          'bimkon-slider__thumb_selected',
        );
      if (this.toValuePointer === null || this.toValuePointer.thumbElement === null) return;
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
      if (this.newPosition === null) return;
      if (this.newPosition < 0) {
        this.newPosition = 0;
      }

      if (this.newPosition > rightEdge) {
        this.newPosition = rightEdge;
      }
      if (this.newPosition === null || this.fromValuePointer === null) return;
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
    if (this.options === null) return;
    if (this.options.isRange) {
      this.midBetweenPointers = this.calculateMidBetweenPointers();
      this.newPosition = this.calculateNewPosition();
      if (this.toValuePointer === null || this.newPosition === null) return;
      if (this.newPositionInPercents === null || this.midBetweenPointers === null) return;
      if (this.newPosition > this.midBetweenPointers) {
        this.dispatchThumbPosition({
          position: this.newPositionInPercents,
          pointerToMove: this.toValuePointer,
        });
      } else {
        if (this.fromValuePointer === null || this.newPositionInPercents === null) return;
        this.dispatchThumbPosition({
          position: this.newPositionInPercents,
          pointerToMove: this.fromValuePointer,
        });
      }
    } else {
      if (this.fromValuePointer === null || this.newPositionInPercents === null) return;
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
    if (this.fromValuePointer === null || this.toValuePointer === null) return;
    this.fromValuePointer.updateEventListeners();
    if (isRange) this.toValuePointer.updateEventListeners();
  }

  @bind
  dispatchThumbPosition(data: { position: number; pointerToMove?: ThumbView }) {
    const { position, pointerToMove } = data;
    if (pointerToMove === undefined) return;
    this.updateZIndex(pointerToMove);
    const nameOfPointer = this.checkPointerType(pointerToMove);
    if (nameOfPointer !== null) {
      this.observer.broadcast({
        position,
        pointerToMove: nameOfPointer,
      });
    }
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
        if (this.fromValuePointer === null) return;
        if (this.fromValuePointer.thumbElement === null || this.fromValuePointer === null) return;
        this.fromValuePointer.thumbElement.classList.remove(
          'bimkon-slider__thumb_selected',
        );
        break;
      default:
    }
    if (pointer.thumbElement === null) return;
    pointer.thumbElement.classList.add('bimkon-slider__thumb_selected');
  }

  calculateMidBetweenPointers() {
    if (this.fromValuePointer === null
       || this.fromValuePointer.thumbElement === null) return null;
    if (this.toValuePointer === null || this.toValuePointer.thumbElement === null) return null;
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
    if (event === undefined) return null;
    const newPosition = event[this.axis.eventClientOrientation]
      - this.pathElement.getBoundingClientRect()[this.axis.direction];
    return newPosition;
  }
}

export default SliderPath;
