import TipView from '../src/plugin/view/tip-view/TipView';

const tipElement = new TipView();

describe('View / Tip / Test of initializing', () => {
  it('Tip should be defined', () => {
    expect(tipElement.tipElement).toHaveClass('js-bimkon-slider__tip');
  });

  it('method setTipValue should set Tip value', () => {
    tipElement.setTipValue(25);
    expect(tipElement.tipElement.innerHTML).toEqual('25');
  });
});
