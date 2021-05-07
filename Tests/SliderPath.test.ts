import { SliderPath } from '../src/plugin/View/SliderPath/SliderPath';
import { Scale } from '../src/plugin/View/Scale/Scale';
import { ThumbView } from '../src/plugin/View/ThumbView/ThumbView';
import '@testing-library/jest-dom';


const sliderPath = new SliderPath();

describe('SliderPath testing/ testing of setting', () => {

  it('should set SliderPath', () => {
    expect(sliderPath).toBeDefined();
  });

});

describe('Testing of methods', () => {

  it('should set single slider', () => {
    sliderPath.makeSingle();
    expect(sliderPath.scale).toBeDefined();
  });

  it('should set range slider', () => {
    sliderPath.makeRange();
    expect(sliderPath.toValuePointer).toBeDefined();
    expect(sliderPath.scale).toBeDefined();
  });

  it('should set range slider', () => {
    sliderPath.makeRange();
    expect(sliderPath.toValuePointer).toBeDefined();
    expect(sliderPath.scale).toBeDefined();
  });


  it('should set pointer position', () => {
    const options = {
      isRange: true,
      isVertical: true,
    };
    sliderPath.setPointerPosition({fromInPercents:50, toInPercents: 100, options});
    expect(sliderPath.fromValuePointer.position).toEqual(50);
    expect(sliderPath.toValuePointer.position).toEqual(100);
  });

  it('should update range line', () => {
    const options = {
      isRange: true,
      isVertical: true,
    };
    sliderPath.updateRangeLine(options,50, 100,);
    expect(sliderPath.rangePathLine.pathLine.style.top).toEqual(`${50}%`);
    expect(sliderPath.rangePathLine.pathLine.style.height).toEqual(`${50}%`);
  });

  it('should update range line/false options', () => {
    const options = {
      isRange: false,
      isVertical: false,
    };
    sliderPath.updateRangeLine(options,50, 100,);
    expect(sliderPath.rangePathLine.pathLine.style.left).toEqual(`${0}%`);
    expect(sliderPath.rangePathLine.pathLine.style.width).toEqual(`${50}%`);
  });


});


