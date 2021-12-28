import Presenter from '../src/plugin/presenter/Presenter';
const div  = document.createElement('div');

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

describe('Presenter / Test of initialization ', () => {
  const presenter = new Presenter(div, options);


  it('presenter should be defined', () => {
    expect(presenter).toBeDefined();
  });
});

describe('Presenter / Test of methods ', () => {
  const presenter = new Presenter(div, options);

  it('presenter should be defined', () => {
    expect(()=> {presenter.update}).not.toThrow();
  });

  it('presenter should be defined', () => {
    expect(()=> {presenter.callbackOnUpdate}).not.toThrow();
  });
});



