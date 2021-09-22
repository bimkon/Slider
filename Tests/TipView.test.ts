import TipView from '../src/plugin/View/TipView/TipView';

const tipElement = new TipView();

describe('View / Tip / Test of initializing', () => {
  it('Tip should be defined', () => {
    expect(tipElement.tipElement).toHaveClass('bimkon-slider__tip');
  });

  it('should set set Tip value ', () => {
    tipElement.setTipValue(25);
    expect(tipElement.tipElement.innerHTML).toEqual('25');
  });
});
