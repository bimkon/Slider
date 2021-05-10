import '@testing-library/jest-dom';
import { Scale } from '../src/plugin/View/Scale/Scale';

const scale = new Scale();
const testScaleElement = scale.scale;
document.body.appendChild(testScaleElement);

describe('init scale', () => {
  it('should init scale', () => {
    expect(testScaleElement).toHaveClass('js-bimkon-slider__scale');
  });

  it('should call method', () => {
    scale.initNumberOnScale(0, 100);
    expect(scale.scaleValue1.textContent).toEqual('0');
    expect(scale.scaleValue6.textContent).toEqual('100');
  });
});
