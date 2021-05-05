import { Model } from './Model';

describe('Model / Test of setting pointer values', () => {
  const model = new Model({
    min: 20,
    max: 100,
    step: 2,
    isRange: true,
    from: 25,
    to: 55,
  });

  model.setSettings({ step: 5 });

  it('Should change toValue pointer position 65', () => {
    model.applyValue(58, 'toValue');
    expect(model.getSettings().to).toEqual(65);
  });

  it('Method  calculatePercentsToValue', () => {
    expect(model.calculateValueWithStep(92)).toEqual(90);
  });

  it('Method calculateValueWithStep', () => {
    expect(model.calculateValueWithStep(92)).toEqual(90);
  });



});

