import { normalizeConfig } from './../src/plugin/typeguards/typeguards';

describe('test of function normalization', () => {
  it('function normalizeConfig should return object with only normalized options', () => {
    const options = {
      isRange: 1,
      min: true,
      max: 100,
      step: 1,
      isVertical: false,
      from: true,
      to: 85,
      hasTip: false,
      numberOfStrokes: 3,
    };
    const normalizedOptions = normalizeConfig(options);
    expect(normalizedOptions.isRange).not.toBeDefined();
    expect(normalizedOptions.min).not.toBeDefined();
    expect(normalizedOptions.from).not.toBeDefined();
  });
});

describe('test of function normalization', () => {
  it('function normalizeConfig should return undefined because of wrong config', () => {
    function isEmpty(obj:Object) {
      for (let key in obj) {
        return false;
      }
      return true;
    }
    const options = {
      isRange: 1,
      min: true,
      max: false,
      step: false,
      isVertical: 3,
      from: true,
      to: false,
      hasTip: 5,
      numberOfStrokes: false,
    };
    const normalizedOptions = normalizeConfig(options);
    expect(isEmpty(normalizedOptions)).toBeTruthy;

  });
});