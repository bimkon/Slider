import ThumbView from '../src/plugin/view/thumb-view/ThumbView';

document.body.innerHTML =
  '<div class="js-bimkon-slider__path-line"><div class="js-bimkon-slider__path"></div></div>';

const pathElement = document.querySelector(
  '.js-bimkon-slider__path'
);

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
let pointerView:ThumbView;
if (pathElement instanceof HTMLElement) {
  pointerView = new ThumbView(pathElement, options);

  describe('View / Slider Pointer / Test of setting and methods', () => {


    it('Slider thumbView  and properties should be defined', () => {
      expect(pointerView).toBeDefined();
      expect(pointerView.options).toBeDefined();
      expect(pointerView.pathElement).toBeDefined();
      expect(pointerView.axis).toBeDefined();
      expect(pointerView.thumbElement).toHaveClass('js-bimkon-slider__thumb');
    });


    it('method updatePointerPosition should update pointer position', () => {
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
      pointerView.updatePointerPosition(30, options);
      expect(
        parseInt(pointerView.thumbElement.style.left, 10)
      ).toBeCloseTo(30);
    });

    it('method updatePointerPosition should update pointer position / vertical', () => {
      const options = {
        isRange: false,
        min: 2,
        max: 100,
        step: 1,
        isVertical: true,
        from: 20,
        to: 85,
        hasTip: false,
        numberOfStrokes: 3,
      };
      pointerView.updatePointerPosition(30, options);
      expect(
        parseInt(pointerView.thumbElement.style.top, 10)
      ).toBeCloseTo(30);
    });
  });

  describe('testing of mouseEvents on pointer', () => {
    let update: jest.Mock;
    const options = {
      isRange: true,
      min: 0,
      max: 100,
      step: 1,
      isVertical: false,
      from: 30,
      to: 70,
      hasTip: true,
      numberOfStrokes: 3,
    };
    const clickOnSlider = new MouseEvent('mousedown', {
      clientX: 100,
      clientY: 0,
    });

    const moveOnPointer = new MouseEvent('mousemove', {
      clientX: 101,
      clientY: 0,
    });
    const moveUpPointer = new MouseEvent('mouseup');

    it('mouse down on pointer shouldnt call update', () => {
      pointerView.updateEventListeners()
      update = jest.fn();
      pointerView.observer.subscribe(update)
      pointerView.thumbElement.dispatchEvent(clickOnSlider)
      expect(update).not.toHaveBeenCalled();
    });

    it('mouse move should call update', () => {
      pointerView.updateEventListeners()
      update = jest.fn();
      pointerView.observer.subscribe(update)
      pointerView.thumbElement.dispatchEvent(clickOnSlider)
      document.dispatchEvent(moveOnPointer)
      expect(update).toHaveBeenCalled();
    });

    it('mouse down on pointer shouldnt call update', () => {
      pointerView.updateEventListeners()
      update = jest.fn();
      pointerView.observer.subscribe(update)
      document.dispatchEvent(moveUpPointer)
      expect(update).not.toHaveBeenCalled();
    });
  });

}

