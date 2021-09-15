import { ThumbView } from './ThumbView';
import '@testing-library/jest-dom';

document.body.innerHTML = '<div class="bimkon-slider__path-line"><div class="bimkon-slider__path"></div></div>';

const pathElement = document.querySelector('.bimkon-slider__path') as HTMLElement;
const pointerView = new ThumbView(pathElement);

describe('View / Slider Pointer / Test of setting and methods', () => {
  beforeEach(() => {
    pathElement.style.width = '400Px';
  });

  it('Slider pointer should be set', () => {
    expect(pointerView).toBeDefined();
  });

  it('Should update pointer position', () => {
    pointerView.updatePointerPosition(30, { isVertical: false });
    expect(Math.round(parseInt(pointerView.thumbElement.style.left, 10))).toBeCloseTo(30);
  });

  it('Should update pointer position', () => {
    pointerView.updatePointerPosition(30, { isVertical: true });
    expect(Math.round(parseInt(pointerView.thumbElement.style.top, 10))).toBeCloseTo(30);
  });

  // it('Should call updateEventListeners', () => {
  //   pointerView.bindEventListeners = jest.fn();
  //   pointerView.updateEventListeners(false, false);
  //   expect(pointerView.bindEventListeners).toBeCalled();
  // });
});

describe('testing of mouseEvents', () => {
  const clickOnSlider = new MouseEvent('mousedown', {
    clientX: 100,
    clientY: 0,
  });

  const moveOnPointer = new MouseEvent('mousemove', {
    clientX: 101,
    clientY: 0,
  });
  const moveUpPointer = new MouseEvent('mouseup');

  it('Should check click', () => {
    pointerView.mouseDown(clickOnSlider);
    expect(pointerView.thumbElement.dispatchEvent(clickOnSlider)).toBeTruthy();
  });

  it('Should check move on Pointer', () => {
    pointerView.onMouseMove(moveOnPointer);
    expect(pointerView.thumbElement.dispatchEvent(moveOnPointer)).toBeTruthy();
  });

  it('Should check moveUP on Pointer', () => {
    pointerView.updateEventListeners();
    pointerView.dispatchThumbPosition = jest.fn();
    pointerView.thumbElement.dispatchEvent(clickOnSlider);
    pointerView.thumbElement.dispatchEvent(moveOnPointer);
    pointerView.thumbElement.dispatchEvent(moveUpPointer);
    pointerView.dispatchThumbPosition({ positionInPixels: 22, isVertical: true });
    expect(pointerView.dispatchThumbPosition).toHaveBeenCalledTimes(1);
  });
});
