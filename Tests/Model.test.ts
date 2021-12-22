import Model from '../src/plugin/Model/Model';

describe('Model / Test of setting pointer values', () => {
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

  it('Model options should be defined', () => {
    const model = new Model(options)
    expect(model.options).toBeDefined();
  });

  it('Should call method setSettings', () => {
    const model = new Model(options)
    model.setSettings = jest.fn();
    model.applyValue(30, 'fromValue');
    expect(model.setSettings).toHaveBeenCalledTimes(1);
  });
});

describe('Model / Test of setters', () => {
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

  it("Should coincide set values 'step'", () => {
    model.setSettings({ step: 10 });
    expect(model.getSettings().step).toEqual(10);
  });

  it("Should coincide set values 'from'", () => {
    model.setSettings({ from: -20 });
    expect(model.getSettings().from).toEqual(-20);
  });

  it("Should coincide set values 'max'", () => {
    model.setSettings({ max: 100 });
    expect(model.getSettings().max).toEqual(100);
  });

  it("Should coincide set values 'isRange'", () => {
    model.setSettings({ isRange: true });
    expect(model.getSettings().isRange).toBeTruthy();
  });

  it("Should coincide set values 'hasTip'", () => {
    model.setSettings({ hasTip: false });
    expect(model.getSettings().hasTip).toEqual(false);
  });

  it("Should coincide set values 'to'", () => {
    model.setSettings({ isRange: true });
    model.setSettings({ to: 35 });
    expect(model.getSettings().to).toEqual(35);
  });

  it("Should coincide set values 'isVertical'", () => {
    model.setSettings({ isVertical: true });
    expect(model.getSettings().isVertical).toBeTruthy();
  });
});

describe('Model / Test of setSettings on flip to default settings', () => {
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

  it("Should coincide set values 'from and to'", () => {
    model.setSettings({ isRange: true, from: 200, to: 550 });
    expect(model.getSettings().isRange).toEqual(true);
    expect(model.getSettings().from).toEqual(200);
    expect(model.getSettings().to).toEqual(550);
  });
});

  describe('Model / Test of normalizing SliderOptions', () => {
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




    it('Should back min to default', () => {
      model.setSettings({ min: 120 });
      expect(model.getSettings().min).toEqual(20);
    });

    it('Should back max to default', () => {
      model.setSettings({ max: 15 });
      expect(model.getSettings().max).toEqual(100);
    });

    it('Should back step to default', () => {
      model.setSettings({ step: 0 });
      expect(model.getSettings().step).toEqual(2);
    });

    it('Should back from to min', () => {
      model.setSettings({ from: 15 });
      expect(model.getSettings().from).toEqual(20);
    });

    it('Should back to on max', () => {
      model.setSettings({ to: 120 });
      expect(model.getSettings().to).toEqual(100);
    });
  });

