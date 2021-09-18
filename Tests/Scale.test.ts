import { Scale } from '../src/plugin/View/Scale/Scale';

const scale = new Scale(6);
const testScaleElement = scale.scale;
document.body.appendChild(testScaleElement);

describe('init scale', () => {
  it('should init scale', () => {
    expect(testScaleElement).toHaveClass('bimkon-slider__scale');
  });

  it('should call method', () => {
    scale.initNumberOnScale(0, 100, true, 1);
    scale.initNumberOnScale(0, 100, false, 1);
    expect(scale.scaleValue.textContent).toEqual('100');

  });
});
