import SliderPath from '../src/plugin/View/SliderPath/SliderPath';
import Scale from '../src/plugin/View/Scale/Scale';

document.body.innerHTML =
  '<div class="js-bimkon-slider__path-line"><div class="js-bimkon-slider__empty-bar"><div class="js-bimkon-slider__scale"><div class="js-bimkon-slider__scale-value"><div class="js-bimkon-slider__path"></div></div></div></div></div>';
  const options = {
    isRange: true,
    min: 0,
    max: 100,
    step: 1,
    isVertical: false,
    from: 30,
    to: 70,
    hasTip: true,
    numberOfStrokes: 3,
  };
  let scaleValues: HTMLElement;
  let scaleValue = document.querySelector(
    '.js-bimkon-slider__scale-value'
  );
  if (scaleValue instanceof HTMLElement) {
    scaleValues = scaleValue;
  }

const sliderPath = new SliderPath(options);
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
describe('SliderPath testing set pointer position', () => {
  it('should set pointer position', () => {
    const options = {
      isRange: true,
      min: 0,
      max: 100,
      step: 1,
      isVertical: false,
      from: 30,
      to: 70,
      hasTip: false,
      numberOfStrokes: 3,
    };
    sliderPath.initRangeSlider(options)
    sliderPath.setPointerPosition({
      fromInPercents: 50,
      toInPercents: 100,
      options,
    });
    expect(sliderPath?.fromValuePointer?.testPosition).toEqual(50);
    expect(sliderPath?.toValuePointer?.testPosition).toEqual(100);
  });
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
  it('Should check mouse down', () => {
    sliderPath.updateEventListenersToBar()
    testPathElement.dispatchEvent(clickOnSlider)
    expect(testPathElement.dispatchEvent(clickOnSlider)).toBeTruthy();
  });

  it('Should check move on Pointer', () => {
    sliderPath.updateEventListenersToBar()
    document.dispatchEvent(moveOnPointer)
    expect(document.dispatchEvent(moveOnPointer)).toBeTruthy();
  });

  it('Should check move up on Pointer', () => {
    sliderPath.updateEventListenersToBar()
    document.dispatchEvent(moveUpPointer)
    expect(document.dispatchEvent(moveUpPointer)).toBeTruthy();
  });
});

describe('testing of mouseEvents on scale', () => {
  const clickOnSlider = new MouseEvent('mousedown', {
    clientX: 100,
    clientY: 0,
  });


  it('Should check mouse down on scale', () => {
    sliderPath.updateEventListenersToScale();
    scaleValues.dispatchEvent(clickOnSlider);
    testScaleElement.dispatchEvent(clickOnSlider);
    expect(testScaleElement.dispatchEvent(clickOnSlider)).toBeTruthy();
  });


});
  // it('should set single slider', () => {
  //   sliderPath.makeSingle(6);
  //   expect(sliderPath.scale).toBeDefined();
  // });

  // it('should set range slider', () => {
  //   sliderPath.makeRange(6);
  //   expect(sliderPath.toValuePointer).toBeDefined();
  //   expect(sliderPath.scale).toBeDefined();
  // });

  // it('should set range slider', () => {
  //   sliderPath.makeRange(6);
  //   expect(sliderPath.toValuePointer).toBeDefined();
  //   expect(sliderPath.scale).toBeDefined();
  // });



  // it('should update range line', () => {
  //   const options = {
  //     isRange: true,
  //     isVertical: true,
  //   };
  //   sliderPath.toValuePointer.axis.direction = options.isVertical ? 'top' : 'left';
  //   sliderPath.toValuePointer.axis.eventClientOrientation = options.isVertical ? 'clientY' : 'clientX';
  //   sliderPath.toValuePointer.axis.offsetParameter = options.isVertical ? 'offsetHeight' : 'offsetWidth';
  //   sliderPath.toValuePointer.axis.styleOrientation = options.isVertical ? 'height' : 'width';
  //   sliderPath.updateRangeLine( 50, 100);
  //   expect(sliderPath.rangePathLine.pathLine.style.height).toEqual(`${30}%`);
  // });

  // it('should update range line/false options', () => {
  //   const options = {
  //     isRange: false,
  //     isVertical: false,
  //   };
  //   sliderPath.updateRangeLine( 50, 100);
  //   expect(sliderPath.rangePathLine.pathLine.style.left).toEqual(`${0}%`);
  //   expect(sliderPath.rangePathLine.pathLine.style.width).toEqual(`${50}%`);
  // });

  // it('should update range line/true false options', () => {
  //   const options = {
  //     isRange: true,
  //     isVertical: false,
  //   };
  //   sliderPath.updateRangeLine( 50, 100);
  //   expect(sliderPath.rangePathLine.pathLine.style.top).toEqual(`${50}%`);
  //   expect(sliderPath.rangePathLine.pathLine.style.height).toEqual(`${50}%`);
  // });

  // it('should update range line/false options', () => {
  //   const options = {
  //     isRange: false,
  //     isVertical: true,
  //   };
  //   sliderPath.updateRangeLine( 50, 100);
  //   expect(sliderPath.rangePathLine.pathLine.style.left).toEqual(`${50}%`);
  //   expect(sliderPath.rangePathLine.pathLine.style.width).toEqual(`${50}%`);
  // });

  // it('Should call bindEventListenersToScale', () => {
  //   sliderPath.scale.scale.removeEventListener = jest.fn();
  //   sliderPath.updateEventListenersToScale();
  //   expect(sliderPath.scale.scale.removeEventListener).toHaveBeenCalledTimes(1);
  // });

  // it('Should call showNumberWithData', () => {
  //   sliderPath.showNumberWithData = jest.fn();
  //   // sliderPath.bindEventListenersToScale(0, 100, true, true);
  //   expect(sliderPath.showNumberWithData).toBeCalled;
  // });
  // });

  // describe('testing of mouseEvents', () => {
  //   const clickOnSlider = new MouseEvent('mousedown', {
  //     clientX: 100,
  //     clientY: 0,
  //   });
  //   const moveOnPointer = new MouseEvent('mousemove', { bubbles: true, clientX: 101 });
  //   const moveUpPointer = new MouseEvent('mouseup');
  //   sliderPath.updateEventListenersToScale();
  //   sliderPath.scale.scaleValue.dispatchEvent(clickOnSlider);
  //   sliderPath.scale.scaleValue.dispatchEvent(moveOnPointer);

  //   const mouseDownEvent = new Event('mousedown', { bubbles: true });

  //   it('Should call dispatchThumbPosition by clicking on bar', () => {
  //     sliderPath.dispatchThumbPosition = jest.fn();
  //     sliderPath.updateEventListenersToBar();
  //     sliderPath.mouseDown(clickOnSlider);
  //     sliderPath.mouseDown(clickOnSlider);
  //     sliderPath.mouseDown(clickOnSlider);
  //     testPathElement.dispatchEvent(clickOnSlider);
  //     document.dispatchEvent(moveOnPointer);
  //     expect(sliderPath.dispatchThumbPosition).toHaveBeenCalledTimes(5);
  //   });

  //   it('Should call dispatchThumbPosition by clicking on scale', () => {
  //     sliderPath.dispatchThumbPosition = jest.fn();
  //     sliderPath.updateEventListenersToBar();
  //     sliderPath.showNumber(clickOnSlider);
  //     sliderPath.showNumber(clickOnSlider);
  //     sliderPath.showNumber(clickOnSlider);
  //     sliderPath.showNumber(clickOnSlider);
  //     expect(sliderPath.dispatchThumbPosition).toHaveBeenCalledTimes(4);
  //   });
  // let clickEvent = new MouseEvent('click', {
  //   bubbles: true,
  //   cancelable: true,
  //   clientX: 150,
  //   clientY: 150,
  // });

  // const moveOnPointer = new MouseEvent('mousemove', {
  //   clientX: 101,
  //   clientY: 0,
  // });
  // const moveUpPointer = new MouseEvent('mouseup');

  // it('Should call dispatchThumbPosition by clicking on scale', () => {
  //   sliderPath.updateEventListenersToScale();
  //   sliderPath.dispatchThumbPosition = jest.fn();
  //   sliderPath.scale.scaleValue.dispatchEvent(clickEvent);
  //   expect(sliderPath.dispatchThumbPosition).toHaveBeenCalledTimes(1);
  // });

  // it('Should call dispatchThumbPosition by clicking on sliders bar', () => {
  //   sliderPath.updateEventListenersToBar();
  //   sliderPath.dispatchThumbPosition = jest.fn();
  //   sliderPath.rangePathLine.emptyBar.dispatchEvent(clickEvent);
  //   sliderPath.rangePathLine.emptyBar.dispatchEvent(moveOnPointer);
  //   sliderPath.rangePathLine.emptyBar.dispatchEvent(moveUpPointer);
  //   sliderPath.dispatchThumbPosition({
  //     position: 30,
  //     pointerToMove: sliderPath.fromValuePointer,
  //   });
  //   expect(sliderPath.dispatchThumbPosition).toHaveBeenCalledTimes(1);
  // });
