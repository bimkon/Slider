import Scale from '../src/plugin/View/Scale/Scale';

const scale = new Scale(6);
const testScaleElement = scale.scale;
document.body.appendChild(testScaleElement);

describe('init scale', () => {
  it('should init scale', () => {
    expect(testScaleElement).toHaveClass('js-bimkon-slider__scale');
  });

  it('should have numberOfStrokes', () => {
    expect(scale.numberOfStrokes).toBeDefined();
  });

  it('should call method', () => {
    scale.updateNumberOnScale(0, 100, true, 1, 3);
    scale.updateNumberOnScale(0, 100, false, 1, 3);
    expect(scale?.scaleValue?.textContent).toEqual('100');
  });
});
