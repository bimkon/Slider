import SliderPath from '../src/plugin/view/slider-path/SliderPath';

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


const sliderPath = new SliderPath(options);
const testPathElement = sliderPath.rangePathLine.emptyBar;
document.body.appendChild(testPathElement);
let scaleValues: HTMLElement;
let scaleValue = document.querySelector(
  '.js-bimkon-slider__scale-value'
);
if (scaleValue instanceof HTMLElement) {
  scaleValues = scaleValue;
}

describe('SliderPath testing/ testing of setting', () => {
  it('should set SliderPath', () => {
    expect(sliderPath).toBeDefined();
    expect(sliderPath.options).toBeDefined();
    expect(sliderPath.axis).toBeDefined();
    expect(sliderPath.pathElement).toBeDefined();
    expect(sliderPath.fromValuePointer).toBeDefined();
  });
});

describe('SliderPath testing methods ', () => {

  it('method initRangeSlider should create range slider', () => {
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

  it('method setPointerPosition should update pointer position', () => {
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


describe('testing mouseEvents on pointers and line', () => {
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


  it('click on line should call update', () => {
    sliderPath.updateEventListenersToBar()
    update = jest.fn();
    sliderPath.observer.subscribe(update);
    testPathElement.dispatchEvent(clickOnSlider)
    expect(update).toHaveBeenCalled();
  });

  it('mouse move after clicked line should call update', () => {
    sliderPath.updateEventListenersToBar()
    update = jest.fn();
    sliderPath.observer.subscribe(update);
    testPathElement.dispatchEvent(clickOnSlider)
    document.dispatchEvent(moveOnPointer)
    expect(update).toHaveBeenCalled();
  });

  it('move up shouldnt call update', () => {
    sliderPath.updateEventListenersToBar()
    update = jest.fn();
    sliderPath.observer.subscribe(update);
    document.dispatchEvent(moveUpPointer)
    expect(update).not.toHaveBeenCalled();
  });
});

describe('testing of mouse down on scale values', () => {
  let update: jest.Mock;
  const clickOnSlider = new MouseEvent('mousedown', {
    clientX: 100,
    clientY: 0,
  });


  it('click on scale value should call update', () => {
    sliderPath.updateEventListenersToScale();
    update = jest.fn();
    sliderPath.observer.subscribe(update);
    sliderPath.scale?.scaleValue?.dispatchEvent(clickOnSlider);
    scaleValues.dispatchEvent(clickOnSlider);
    expect(update).toHaveBeenCalled();
  });
});

