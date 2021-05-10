import { TipView } from '../src/plugin/View/TipView/TipView';
import '@testing-library/jest-dom';

const tipElement = new TipView();

describe('View / Tip / Test of initializing', () => {
  it('Tip should be defined', () => {
    expect(tipElement.tipElement).toHaveClass('js-bimkon-slider__tip');
  });

  it('Tip value should coincide setting value', () => {
    tipElement.setTipValue(25);
    expect(tipElement.tipElement.innerHTML).toEqual('25');
  });
});
