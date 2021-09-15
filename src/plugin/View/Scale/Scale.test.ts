import '@testing-library/jest-dom';
import { Scale } from './Scale';

const scale = new Scale(6);
const testScaleElement = scale.scale;
document.body.appendChild(testScaleElement);

describe('init scale', () => {
  it('should init scale', () => {
    expect(testScaleElement).toHaveClass('bimkon-slider__scale');
  });

  it('should call method', () => {
    scale.initNumberOnScale(0, 100, true);
    scale.initNumberOnScale(0, 100, false);
    expect(scale.scaleValue.textContent).toEqual('100');

  });
});