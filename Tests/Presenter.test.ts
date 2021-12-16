import Presenter from '../src/plugin/Presenter/Presenter';

document.body.innerHTML =
  '<div class="js-bimkon-slider"><div class="js-bimkon-slider__empty-bar"><div class="js-bimkon-slider__scale"><div class="js-bimkon-slider__path"></div></div></div></div>';
const rootElement = document.querySelector('.js-bimkon-slider');
const options = {
  isRange: false,
  min: 2,
  max: 100,
  step: 1,
  isVertical: false,
  from: 20,
  to: 85,
  hasTip: false,
  numberOfStrokes: 3,
};
let presenter: Presenter;
if (rootElement instanceof HTMLElement) {
 presenter = new Presenter(rootElement, options);
}



describe('Presenter / Test of initialization ', () => {
  presenter.update(options);

  it('Should change min to 2', () => {
    expect(presenter.model.getSettings().min).toEqual(2);
  });
});

describe('Presenter / test of methods', () => {
  it('Should subscribe on changes', () => {
    presenter.callbackOnUpdate(() => presenter.model.getSettings());
    presenter.model.subscribe = jest.fn();
    presenter.model.setSettings({ from: 15 });
    expect(presenter.model.subscribe).toBeTruthy;
  });
});
