import Scale from '../src/plugin/view/scale/Scale';

const scale = new Scale(6);
const testScaleElement = scale.scale;
document.body.appendChild(testScaleElement);

describe('init scale', () => {
  it('should init scale', () => {
    expect(testScaleElement).toHaveClass('js-bimkon-slider__scale');
    expect(scale.numberOfStrokes).toBeDefined();
  });

  it('method updateNumberOnScale should set scale value', () => {
    scale.updateNumberOnScale(0, 100, true, 1, 3);
    scale.updateNumberOnScale(0, 100, false, 1, 3);
    expect(scale?.scaleValue?.textContent).toEqual('100');
  });
});
