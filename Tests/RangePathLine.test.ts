import '@testing-library/jest-dom';
import { RangePathLine } from '../src/plugin/View/RangePathLine/RangePathLine';

const rangePathLine = new RangePathLine();
const testRangePathElement = rangePathLine.pathLine;
const testEmptyPathElement = rangePathLine.emptyBar;

describe('init RangePathLine and empty bar', () => {
  it('should init rangePathLine', () => {
    expect(testRangePathElement).toHaveClass('js-bimkon-slider__path-line');
  });

  it('should init empty bar', () => {
    expect(testEmptyPathElement).toHaveClass('js-bimkon-slider__empty-bar');
  });
});
