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
  it('options should be defined', () => {
    expect(sliderPath.options).toBeDefined();
  });
  it('axis should be defined', () => {
    expect(sliderPath.axis).toBeDefined();
  });
  it('pathElement should be defined', () => {
    expect(sliderPath.pathElement).toBeDefined();
  });
  it('fromValuePointer should be defined', () => {
    expect(sliderPath.fromValuePointer).toBeDefined();
  });
});
describe('SliderPath testing methods ', () => {
  it('initRangeSlider should create range slider', () => {
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
    sliderPath.initRangeSlider(options);
    expect(sliderPath.toValuePointer).toBeDefined();
  });
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
  let update: jest.Mock;
  const clickOnSlider = new MouseEvent('mousedown', {
    clientX: 100,
    clientY: 0,
  });

  const moveOnPointer = new MouseEvent('mousemove', {
    clientX: 105,
    clientY: 0,
  });
  const moveUpPointer = new MouseEvent('mouseup');


  it('Should check mouse down', () => {
    sliderPath.updateEventListenersToBar()
    update = jest.fn();
    sliderPath.observer.subscribe(update);
    testPathElement.dispatchEvent(clickOnSlider)
    expect(update).toHaveBeenCalled();
  });

  it('Should check move on Pointer', () => {
    sliderPath.updateEventListenersToBar()
    update = jest.fn();
    sliderPath.observer.subscribe(update);
    testPathElement.dispatchEvent(clickOnSlider)
    document.dispatchEvent(moveOnPointer)
    expect(update).toHaveBeenCalled();
  });

  it('Should check move up on Pointer', () => {
    sliderPath.updateEventListenersToBar()
    update = jest.fn();
    sliderPath.observer.subscribe(update);
    testPathElement.dispatchEvent(clickOnSlider)
    document.dispatchEvent(moveUpPointer)
    expect(update).toHaveBeenCalled();
  });
});

describe('testing of mouseEvents on scale', () => {
  let update: jest.Mock;
  const clickOnSlider = new MouseEvent('mousedown', {
    clientX: 100,
    clientY: 0,
  });


  it('Should check mouse down on scale', () => {
    sliderPath.updateEventListenersToScale();
    update = jest.fn();
    sliderPath.observer.subscribe(update);
    testPathElement.dispatchEvent(clickOnSlider)
    scaleValues.dispatchEvent(clickOnSlider);
    testScaleElement.dispatchEvent(clickOnSlider);
    expect(update).toHaveBeenCalled();
  });
});

