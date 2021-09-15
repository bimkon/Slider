import '@testing-library/jest-dom';
import { MainView } from './MainView';

document.body.innerHTML = '<div class="j-bimkon-slider"><div class="js-bimkon-slider__empty-bar"><div class="js-bimkon-slider__scale"><div class="js-bimkon-slider__path"></div></div></div></div>';
const rootElement = document.querySelector('.j-bimkon-slider') as HTMLElement;
const options = {
  isRange: false,
  min: 0,
  max: 100,
  step: 1,
  isVertical: true,
  from: 30,
  to: 70,
  hasTip: true,
};
const mainView = new MainView(rootElement, options);

describe('init mainView', () => {
  it('should init slider', () => {
    expect(mainView.sliderMainElement).toHaveClass('j-bimkon-slider');
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
    };
    mainView.setScale = jest.fn();
    mainView.update(options);
    expect(mainView.setScale).toBeCalledTimes(1);
  });

  it('should call orientation', () => {
    const options = {
      isRange: true,
      min: 0,
      max: 100,
      step: 1,
      isVertical: false,
      from: 30,
      to: 70,
      hasTip: false,
    };
    mainView.makeOrientation(false);
    expect(mainView.sliderPath.pathElement).not.toHaveClass('js-bimkon-slider__path');
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
    };
    mainView.updateBooleanOptions(options);
    expect(mainView.sliderPath.toValuePointer.tip.tipElement).toHaveClass('bimkon-slider__tip');
    expect(mainView.sliderPath.fromValuePointer.tip.tipElement).toHaveClass('bimkon-slider__tip');
    expect(mainView.sliderPath.pathElement).toHaveClass('bimkon-slider__path');
    expect(mainView.sliderPath.fromValuePointer.thumbElement).toHaveClass('bimkon-slider__thumb');
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
    };
    mainView.updateBooleanOptions(options);
    expect(mainView.sliderPath.fromValuePointer.tip.tipElement).not.toHaveClass('js-bimkon-slider__tip');
    expect(mainView.sliderPath.pathElement).not.toHaveClass('js-bimkon-slider__path');
    expect(mainView.sliderPath.fromValuePointer.thumbElement).not.toHaveClass('js-bimkon-slider__thumb');
    expect(mainView.sliderPath.scale.scale).not.toHaveClass('js-bimkon-slider__scale');
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
    };
    mainView.updateBooleanOptions(options);
    expect(mainView.sliderPath.toValuePointer.thumbElement).not.toHaveClass('js-bimkon-slider__thumb');
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
    };
    mainView.sliderPath.setPointerPosition = jest.fn();
    mainView.setPointerPosition({
      fromPointerValue: 10, fromInPercents: 10, toPointerValue: 20, toInPercents: 20, options,
    });
    expect(mainView.sliderPath.setPointerPosition).toBeCalledTimes(1);
  });
});
