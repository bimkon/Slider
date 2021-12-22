import MainView from '../src/plugin/View/MainView/MainView';

document.body.innerHTML =
  '<div class="js-bimkon-slider"><div class="js-bimkon-slider__empty-bar"><div class="js-bimkon-slider__scale"><div class="js-bimkon-slider__path"></div></div></div></div>';
const rootElement = document.querySelector('.js-bimkon-slider');
const options = {
  isRange: false,
  min: 2,
  max: 100,
  step: 1,
  isVertical: false,
  from: 20,
  to: 85,
  hasTip: false,
  numberOfStrokes: 3,
};
let mainView: MainView;
if (rootElement instanceof HTMLElement) {
 mainView = new MainView(rootElement, options);
}


describe('init mainView', () => {
  it('should init slider', () => {
    expect(mainView.sliderMainElement).toHaveClass('js-bimkon-slider');
  });

  it('should should have options', () => {
    expect(mainView.options).toBeDefined();
  });

  it('should should have sliderPath defined', () => {
    expect(mainView.sliderPath).toBeDefined();
  });
});

describe('test of methods', () => {
  it('should call update', () => {
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
    // mainView.setScale = jest.fn();
    // mainView.update(options);
    // expect(mainView.setScale).toBeCalledTimes(1);
  });

  it('should call updateBooleanOptions / true', () => {
    const options = {
      isRange: true,
      min: 0,
      max: 100,
      step: 1,
      isVertical: true,
      from: 30,
      to: 70,
      hasTip: true,
      numberOfStrokes: 3,
    };
    mainView.updateBooleanOptions(options);
    expect(mainView?.sliderPath?.toValuePointer?.tip.tipElement).toHaveClass(
      'js-bimkon-slider__tip'
    );
    expect(mainView?.sliderPath?.fromValuePointer?.tip.tipElement).toHaveClass(
      'js-bimkon-slider__tip'
    );
    expect(mainView?.sliderMainElement).toHaveClass(
      'js-bimkon-slider js-bimkon-slider_vertical'
    );

  });

  it('should call updateBooleanOptions / false', () => {
    const options = {
      isRange: false,
      min: 0,
      max: 100,
      step: 1,
      isVertical: false,
      from: 30,
      to: 70,
      hasTip: false,
      numberOfStrokes: 3,
    };
    mainView.updateBooleanOptions(options);
    expect(mainView?.sliderPath?.toValuePointer?.tip.tipElement).not.toHaveClass(
      'js-bimkon-slider__tip'
    );
    expect(mainView?.sliderPath?.fromValuePointer?.tip.tipElement).not.toHaveClass(
      'js-bimkon-slider__tip'
    );
    expect(mainView?.sliderMainElement).toHaveClass(
      'js-bimkon-slider js-bimkon-slider_horizontal'
    );
  });

  it('should call updateBooleanOptions / false/true', () => {
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
    mainView.updateBooleanOptions(options);
    expect(mainView?.sliderPath?.toValuePointer?.thumbElement).toBeVisible();
  });

  it('should call setPointerPosition', () => {
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
    mainView.sliderPath.setPointerPosition = jest.fn();
    mainView.setPointerPosition({
      fromPointerValue: 10,
      fromInPercents: 10,
      toPointerValue: 20,
      toInPercents: 20,
      options,
    });
    expect(mainView.sliderPath.setPointerPosition).toBeCalledTimes(1);
  });

  it('should call updateTipValue', () => {
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
    if (mainView.sliderPath.fromValuePointer === null) return;
    mainView.sliderPath.fromValuePointer.tip.setTipValue = jest.fn();
    mainView.setPointerPosition({
      fromPointerValue: 10,
      fromInPercents: 10,
      toPointerValue: 20,
      toInPercents: 20,
      options,
    });
    expect(mainView?.sliderPath?.fromValuePointer?.tip.setTipValue).toBeCalledTimes(1);
  });
});
