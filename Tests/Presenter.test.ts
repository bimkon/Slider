import Presenter from '../src/plugin/Presenter/Presenter';
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
let presenter: Presenter;



describe('Presenter / Test of initialization ', () => {
  presenter = new Presenter(div, options);

  it('presenter should be defined', () => {
    expect(presenter).toBeDefined();
  });
});



