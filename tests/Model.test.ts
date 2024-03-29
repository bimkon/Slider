import Model from '../src/plugin/model/Model';


describe('Model / Test of initialization', () => {
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

  it('Model  should be defined', () => {
    const model = new Model(options)
    expect(model).toBeDefined();
  });


});
describe('Model / Test of method getSettings / applyValue', () => {
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

  it('method getSettings should return options', () => {
    const model = new Model(options);
    const settings = model.getSettings();
    expect(Object.keys(settings).length > 0).toBeTruthy
    expect(settings).toEqual(options);
  });

  it('method applyValue should call method setSettings', () => {
    const model = new Model(options)
    model.setSettings = jest.fn();
    model.applyValue(30, 'fromValue');
    model.applyValue(40, 'toValue');
    expect(model.setSettings).toHaveBeenCalledTimes(2);
  });
});

describe('Model / Test of method setSettings', () => {
  const model: Model = new Model({
    isRange: false,
    min: 2,
    max: 100,
    step: 1,
    isVertical: false,
    from: 20,
    to: 85,
    hasTip: false,
    numberOfStrokes: 3
  });

  beforeEach(() => {
    model.setSettings({
      isRange: false,
      min: -1000,
      max: 1000,
      step: 1,
    });
  });

  it("method setSettings should set step of Slider", () => {
    model.setSettings({ step: 10 });
    expect(model.getSettings().step).toEqual(10);
  });

  it("method setSettings should set from of Slider", () => {
    model.setSettings({ from: -20 });
    expect(model.getSettings().from).toEqual(-20);
  });

  it("method setSettings should set max of Slider", () => {
    model.setSettings({ max: 100 });
    expect(model.getSettings().max).toEqual(100);
  });

  it("method setSettings should set to of Slider", () => {
    model.setSettings({ to: 35 });
    expect(model.getSettings().to).toEqual(35);
  });

});

describe('Model / Test of method setSettings multi settings', () => {
  const model: Model = new Model({
    isRange: false,
    min: 2,
    max: 100,
    step: 1,
    isVertical: false,
    from: 20,
    to: 85,
    hasTip: false,
    numberOfStrokes: 3
  });

  beforeEach(() => {
    model.setSettings({
      isRange: false,
      min: -1000,
      max: 1000,
      step: 1,
    });
  });

  it("method setSettings should set 'from and to'", () => {
    model.setSettings({ from: 200, to: 550 });
    expect(model.getSettings().from).toEqual(200);
    expect(model.getSettings().to).toEqual(550);
  });
});

  describe('Model / Validation test of method setSettings', () => {
    const model: Model = new Model({
      isRange: false,
      min: 20,
      max: 100,
      step: 2,
      isVertical: false,
      from: 20,
      to: 85,
      hasTip: false,
      numberOfStrokes: 3
    });

    it('method setSettings should back normal value of min if min > max', () => {
      model.setSettings({ min: 120 });
      expect(model.getSettings().min).toEqual(20);
    });

    it('method setSettings should back normal value of max if max < min', () => {
      model.setSettings({ max: 15 });
      expect(model.getSettings().max).toEqual(100);
    });

    it('method setSettings should back normal value of step if step <= 0', () => {
      model.setSettings({ step: 0 });
      expect(model.getSettings().step).toEqual(2);
    });

    it('method setSettings should back normal value of from if from < min', () => {
      model.setSettings({ from: 15 });
      expect(model.getSettings().from).toEqual(20);
    });

    it('method setSettings should back normal value of to if to > max', () => {
      model.setSettings({ to: 120 });
      expect(model.getSettings().to).toEqual(100);
    });
    it('method setSettings should back normal value of from if from > max', () => {
      model.setSettings({ to: 15 });
      expect(model.getSettings().to).toEqual(22);
    });
    it('method setSettings should back normal value of min and from if from > min', () => {
      model.setSettings({ min: 21 });
      expect(model.getSettings().min).toEqual(21);
      expect(model.getSettings().from).toEqual(21);
    });
    it('method setSettings should back normal value of to if to > min', () => {
      model.setSettings({ from: 110 });
      expect(model.getSettings().from).toEqual(100);
    });
    it('method setSettings should back normal value of to if to < mins', () => {
      model.setSettings({ isRange: true });
      model.setSettings({ to: 25 });
      model.setSettings({ isRange: false });
      model.setSettings({ from: 50 });
      model.setSettings({ isRange: true });
      expect(model.getSettings().from).toEqual(51);
    });
  });

