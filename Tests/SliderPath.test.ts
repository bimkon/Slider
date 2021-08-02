import { SliderPath } from '../src/plugin/View/SliderPath/SliderPath';
import '@testing-library/jest-dom';
import { Scale } from '../src/plugin/View/Scale/Scale';

document.body.innerHTML = '<div class="js-bimkon-slider__path-line"><div class="js-bimkon-slider__empty-bar"><div class="js-bimkon-slider__scale"><div class="js-bimkon-slider__path"></div></div></div></div>';

const sliderPath = new SliderPath();
const testPathElement = sliderPath.rangePathLine.emptyBar;
document.body.appendChild(testPathElement);
const scale = new Scale(6);
const testScaleElement = scale.scale;
document.body.appendChild(testScaleElement);

describe('SliderPath testing/ testing of setting', () => {
  it('should set SliderPath', () => {
    expect(sliderPath).toBeDefined();
  });
});

describe('Testing of methods', () => {
  it('should set single slider', () => {
    sliderPath.makeSingle(6);
    expect(sliderPath.scale).toBeDefined();
  });

  it('should set range slider', () => {
    sliderPath.makeRange(6);
    expect(sliderPath.toValuePointer).toBeDefined();
    expect(sliderPath.scale).toBeDefined();
  });

  it('should set range slider', () => {
    sliderPath.makeRange(6);
    expect(sliderPath.toValuePointer).toBeDefined();
    expect(sliderPath.scale).toBeDefined();
  });

  it('should set pointer position', () => {
    const options = {
      isRange: true,
      isVertical: true,
    };
    sliderPath.setPointerPosition({ fromInPercents: 50, toInPercents: 100, options });
    expect(sliderPath.fromValuePointer.position).toEqual(50);
    expect(sliderPath.toValuePointer.position).toEqual(100);
  });

  it('should update range line', () => {
    const options = {
      isRange: true,
      isVertical: true,
    };
    sliderPath.updateRangeLine( 50, 100);
    expect(sliderPath.rangePathLine.pathLine.style.top).toEqual(`${50}%`);
    expect(sliderPath.rangePathLine.pathLine.style.height).toEqual(`${50}%`);
  });

  it('should update range line/false options', () => {
    const options = {
      isRange: false,
      isVertical: false,
    };
    sliderPath.updateRangeLine( 50, 100);
    expect(sliderPath.rangePathLine.pathLine.style.left).toEqual(`${0}%`);
    expect(sliderPath.rangePathLine.pathLine.style.width).toEqual(`${50}%`);
  });

  it('should update range line/true false options', () => {
    const options = {
      isRange: true,
      isVertical: false,
    };
    sliderPath.updateRangeLine( 50, 100);
    expect(sliderPath.rangePathLine.pathLine.style.top).toEqual(`${50}%`);
    expect(sliderPath.rangePathLine.pathLine.style.height).toEqual(`${50}%`);
  });

  it('should update range line/false options', () => {
    const options = {
      isRange: false,
      isVertical: true,
    };
    sliderPath.updateRangeLine( 50, 100);
    expect(sliderPath.rangePathLine.pathLine.style.left).toEqual(`${50}%`);
    expect(sliderPath.rangePathLine.pathLine.style.width).toEqual(`${50}%`);
  });

  // it('Should call bindEventListenersToScale', () => {
  //   sliderPath.bindEventListenersToScale = jest.fn();
  //   // sliderPath.updateEventListenersToScale(5, 5, false, false);
  //   expect(sliderPath.bindEventListenersToScale).toHaveBeenCalledTimes(1);
  // });

//   it('Should call showNumberWithData', () => {
//     sliderPath.showNumberWithData = jest.fn();
//     // sliderPath.bindEventListenersToScale(0, 100, true, true);
//     expect(sliderPath.showNumberWithData).toBeCalled;
//   });
// });

// describe('testing of mouseEvents', () => {
//   const clickOnSlider = new MouseEvent('mousedown', {
//     clientX: 100,
//     clientY: 0,
//   });
//   const moveOnPointer = new MouseEvent('mousemove', { bubbles: true, clientX: 101 });
//   const moveUpPointer = new MouseEvent('mouseup');
//   // sliderPath.bindEventListenersToBar(true,true)
//   // sliderPath.rangePathLine.emptyBar.dispatchEvent(clickOnSlider);
//   // sliderPath.rangePathLine.emptyBar.dispatchEvent(moveOnPointer);

//   const mouseDownEvent = new Event('mousedown', { bubbles: true });

//   it('Should call dispatchThumbPosition by clicking on bar', () => {
//     sliderPath.dispatchThumbPosition = jest.fn();
//     // sliderPath.bindEventListenersToBar(true, true);
//     // sliderPath.mouseDown(false, false, clickOnSlider);
//     // sliderPath.mouseDown(false, true, clickOnSlider);
//     // sliderPath.mouseDown(true, false, clickOnSlider);
//     testPathElement.dispatchEvent(clickOnSlider);
//     document.dispatchEvent(moveOnPointer);
//     expect(sliderPath.dispatchThumbPosition).toHaveBeenCalledTimes(5);
//   });

//   it('Should call dispatchThumbPosition by clicking on scale', () => {
//     sliderPath.dispatchThumbPosition = jest.fn();
//     // sliderPath.bindEventListenersToScale(0, 100, true, true);
//     // sliderPath.showNumber(0, 100, true, true, clickOnSlider);
//     // sliderPath.showNumber(0, 100, false, false, clickOnSlider);
//     // sliderPath.showNumber(0, 100, true, false, clickOnSlider);
//     // sliderPath.showNumber(0, 100, false, true, clickOnSlider);
//     expect(sliderPath.dispatchThumbPosition).toHaveBeenCalledTimes(4);
//   });
});
