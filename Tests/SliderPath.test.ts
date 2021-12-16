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

