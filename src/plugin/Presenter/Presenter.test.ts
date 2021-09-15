import { Presenter } from './Presenter';
import { Model } from '../Model/Model';
import { MainView } from '../View/MainView/MainView';
import { SliderOptions } from '../SliderOptions';
import '@testing-library/jest-dom';

document.body.innerHTML = '<div class="j-bimkon-slider"><div class="js-bimkon-slider__empty-bar"><div class="js-bimkon-slider__scale"><div class="js-bimkon-slider__path"></div></div></div></div>';
const rootElement = document.querySelector('.j-bimkon-slider') as HTMLElement;
const options = {
  isRange: false,
  min: 10,
  max: 100,
  step: 1,
  isVertical: true,
  from: 30,
  to: 70,
  hasTip: true,
};
const mainView = new MainView(rootElement, options);
const model = new Model({
  min: 20,
  max: 100,
  step: 2,
  isRange: true,
  from: 25,
  to: 55,
});
const presenter = new Presenter(mainView, model, options);

describe('Presenter / Test of initialization default options', () => {
  presenter.update(options);

  it('Should change min to default 10', () => {
    expect(presenter.model.getSettings().min).toEqual(10);
  });
});

describe('Presenter / test of methods', () => {
  it('Should subscribe on changes', () => {
    presenter.callbackOnUpdate(() => (presenter.model.getSettings()));
    model.subscribe = jest.fn();
    model.setSettings({ from: 15 });
    expect(model.subscribe).toBeTruthy;
  });
});
