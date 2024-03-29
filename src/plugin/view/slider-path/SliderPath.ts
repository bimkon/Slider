/* eslint-disable fsd/split-conditionals */
import bind from 'bind-decorator';
import { Axis, SliderOptions } from '../../types';
import RangePathLine from '../range-path-line/RangePathLine';
import ThumbView from '../thumb-view/ThumbView';
import Scale from '../scale/Scale';
import EventObserver from '../../event-observer/EventObserver';

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

  options: Required<SliderOptions>;

  target: null | HTMLElement = null;

  targetText: string | null = null;

  constructor(options: Required<SliderOptions>) {
    this.options = options;
    this.axis = {
      direction: 'left',
      eventClientOrientation: 'clientY',
      offsetParameter: 'offsetHeight',
      styleOrientation: 'height',
    };
    this.createTemplate(options);
    this.setScale(options);
  }

  initRangeSlider(options: Required<SliderOptions>) {
    const typeOfpointer = 'toValuePointer';
    this.toValuePointer = new ThumbView(this.pathElement, options, typeOfpointer);
    this.pathElement.append(this.toValuePointer.thumbElement);
    this.fromValuePointer?.observer.subscribe(this.dispatchThumbPosition);
    this.toValuePointer?.observer.subscribe(this.dispatchThumbPosition);
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
    this.fromValuePointer?.updatePointerPosition(fromInPercents, options);
    this.toValuePointer?.updatePointerPosition(toInPercents, options);
    this.updateRangeLine(fromInPercents, toInPercents);
  }

  combineTips(data: SliderOptions) {
    const firstTip = this.fromValuePointer?.tip;
    const secondTip = this.toValuePointer?.tip;
    const combinedTip = this.fromValuePointer?.combinedTip;
    if (firstTip !== undefined && secondTip !== undefined && combinedTip !== undefined) {
      const firstTooltipOffset = firstTip.tipElement.getBoundingClientRect()[
        this.axis.direction
      ] + firstTip.tipElement[this.axis.offsetParameter];
      const secondTooltipOffset = secondTip.tipElement.getBoundingClientRect()[
        this.axis.direction
      ];
      const firstValue = firstTip.getValue();
      const secondValue = secondTip.getValue();
      const delimiter = data.isVertical ? ' - ' : ' - ';
      const text = `${firstValue}${delimiter}${secondValue}`;
      combinedTip?.setTipValue(text);

      if (firstTooltipOffset >= secondTooltipOffset) {
        firstTip.hide();
        secondTip.hide();
        combinedTip?.show();
      } else {
        firstTip.show();
        secondTip.show();
        combinedTip?.hide();
      }
    }
  }

  updateEventListenersToScale() {
    this.scale?.scale.removeEventListener('click', this.handleScaleClick);
    this.scale?.scale.addEventListener('click', this.handleScaleClick);
  }

  updateEventListenersToThumb(isRange: boolean) {
    this.fromValuePointer?.updateEventListeners();
    if (isRange) this.toValuePointer?.updateEventListeners();
  }

  @bind
  updateEventListenersToBar() {
    this.removeEventListenersFromBar();
    this.bindEventListenersToBar();
  }

  private createTemplate(options: Required<SliderOptions>) {
    this.pathElement.classList.add('js-bimkon-slider__path');
    const typeOFPointer = 'fromValuePointer';
    this.fromValuePointer = new ThumbView(this.pathElement, options, typeOFPointer);
    this.pathElement.append(
      this.rangePathLine.pathLine,
      this.rangePathLine.emptyBar,
      this.fromValuePointer.thumbElement,
    );
  }

  private setScale(data: Required<SliderOptions>) {
    const {
      min, max, isVertical, step, numberOfStrokes,
    } = data;

    this.scale = new Scale(numberOfStrokes);
    this.pathElement.append(this.scale.scale);
    this.scale.updateNumberOnScale(
      min,
      max,
      isVertical,
      step,
      numberOfStrokes,
    );
    this.updateEventListenersToScale();
  }

  @bind
  private bindEventListenersToBar() {
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
  private removeEventListenersFromBar() {
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
  private handleRangePathLineMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.shift = 0;
    this.newPosition = this.calculateNewPosition(event);
    this.newPositionInPercents = calculateToPercents({
      valueInPixels: this.newPosition,
      pathElement: this.pathElement,
      isVertical: this.options.isVertical,
    });

    this.dispatchThumbPositionOnScaleClick(event);

    document.addEventListener('mousemove', this.handleDocumentMouseMove);
    document.addEventListener('mouseup', this.handleDocumentMouseUp);
    document.addEventListener('dragstart', this.handleRangePathLineDragStart);
  }

  @bind
  private handleDocumentMouseMove(event: MouseEvent) {
    event.preventDefault();
    this.dispatchThumbOnMouseMove(event);
  }

  @bind
  private handleDocumentMouseUp() {
    document.removeEventListener('mouseup', this.handleDocumentMouseUp);
    document.removeEventListener('mousemove', this.handleDocumentMouseMove);
    document.removeEventListener(
      'dragstart',
      this.handleRangePathLineDragStart,
    );
  }

  private handleRangePathLineDragStart() {
    return false;
  }

  @bind
  private handleScaleClick(event: MouseEvent) {
    if (event.target instanceof HTMLElement) {
      this.targetText = event.target.textContent;
      this.target = event.target;
    }
    const scaleValue = Number(this.targetText);
    if (this.target instanceof HTMLElement) {
      if (this.target.classList.contains('js-bimkon-slider__scale')) return;
    }
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
    this.dispatchThumbPositionOnScaleClick(event);
  }

  private dispatchThumbPositionOnScaleClick(event: MouseEvent) {
    if (this.options.isRange) {
      this.midBetweenPointers = this.calculateMidBetweenPointers();
      this.newPosition = this.calculateNewPosition(event);
      if (this.midBetweenPointers !== null) {
        if (this.newPosition > this.midBetweenPointers) {
          if (this.toValuePointer !== null && this.newPositionInPercents !== null) {
            this.dispatchThumbPosition({
              position: this.newPositionInPercents,
              pointerToMove: this.toValuePointer,
            });
          }
        } else if (this.fromValuePointer !== null && this.newPositionInPercents !== null) {
          this.dispatchThumbPosition({
            position: this.newPositionInPercents,
            pointerToMove: this.fromValuePointer,
          });
        }
      }
    } else {
      if (this.fromValuePointer === null || this.newPositionInPercents === null) return;
      this.dispatchThumbPosition({
        position: this.newPositionInPercents,
        pointerToMove: this.fromValuePointer,
      });
    }
  }

  private dispatchThumbOnMouseMove(event: MouseEvent) {
    if (
      this.fromValuePointer !== null
    ) {
      const rightEdge = this.pathElement[this.axis.offsetParameter]
      - this.fromValuePointer.thumbElement[this.axis.offsetParameter]
      + this.fromValuePointer.thumbElement[this.axis.offsetParameter];
      if (this.options.isRange) {
        this.newPosition = this.calculateNewPosition(event);
        if (this.newPosition < 0) {
          this.newPosition = 0;
        }
        if (this.newPosition > rightEdge) {
          this.newPosition = rightEdge;
        }

        this.midBetweenPointers = this.calculateMidBetweenPointers();
        if (this.midBetweenPointers !== null) {
          const newPositionSmallerThenMidBetweenPointers = this.newPosition < this.midBetweenPointers
          && this.fromValuePointer?.thumbElement.classList.contains(
            'bimkon-slider__thumb_selected',
          );

          const newPositionBiggerThenMidBetweenPointers = this.newPosition > this.midBetweenPointers
          && this.toValuePointer?.thumbElement.classList.contains(
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
            if (this.toValuePointer !== null) {
              this.dispatchThumbPosition({
                position: calculateToPercents({
                  valueInPixels: this.newPosition,
                  pathElement: this.pathElement,
                  isVertical: this.options.isVertical,
                }),
                pointerToMove: this.toValuePointer,
              });
            }
          }
        }
      } else {
        this.newPosition = this.calculateNewPosition(event);
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
  }

  @bind
  private dispatchThumbPosition(data: { position: number; pointerToMove?: ThumbView }) {
    const { position, pointerToMove } = data;
    if (pointerToMove !== undefined) {
      this.updateZIndex(pointerToMove);
      const nameOfPointer = this.checkPointerType(pointerToMove);
      if (nameOfPointer !== null) {
        this.observer.broadcast({
          position,
          pointerToMove: nameOfPointer,
        });
      }
    }
  }

  private checkPointerType(pointer: ThumbView) {
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
        this.fromValuePointer?.thumbElement.classList.remove(
          'bimkon-slider__thumb_selected',
        );
        break;
      default:
    }
    pointer.thumbElement.classList.add('bimkon-slider__thumb_selected');
  }

  @bind
  private updateRangeLine(fromInPercents: number, toInPercents: number) {
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

  private calculateMidBetweenPointers() {
    if (
      this.fromValuePointer === null || this.toValuePointer === null
    ) return null;
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

  private calculateNewPosition(event: MouseEvent) {
    const newPosition = event[this.axis.eventClientOrientation]
      - this.pathElement.getBoundingClientRect()[this.axis.direction];
    return newPosition;
  }
}

export default SliderPath;
