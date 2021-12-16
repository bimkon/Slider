import ThumbView from '../src/plugin/View/ThumbView/ThumbView';

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
    beforeEach(() => {
      pathElement.style.width = '400Px';
    });

    it('Slider pointer should be set', () => {
      expect(pointerView).toBeDefined();
    });

    it('Should update pointer position', () => {
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
        Math.round(parseInt(pointerView.thumbElement.style.left, 10))
      ).toBeCloseTo(30);
    });

    it('Should update pointer position', () => {
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
        Math.round(parseInt(pointerView.thumbElement.style.top, 10))
      ).toBeCloseTo(30);
    });
  });

  describe('testing of mouseEvents', () => {
    const clickOnSlider = new MouseEvent('mousedown', {
      clientX: 100,
      clientY: 0,
    });

    const moveOnPointer = new MouseEvent('mousemove', {
      clientX: 101,
      clientY: 0,
    });
    const moveUpPointer = new MouseEvent('mouseup');
    it('Should check mouse down', () => {
      pointerView.updateEventListeners()
      pointerView.thumbElement.dispatchEvent(clickOnSlider)
      expect(pointerView.thumbElement.dispatchEvent(clickOnSlider)).toBeTruthy();
    });

    it('Should check move on Pointer', () => {
      pointerView.updateEventListeners()
      document.dispatchEvent(moveOnPointer)
      expect(document.dispatchEvent(moveOnPointer)).toBeTruthy();
    });

    it('Should check move up on Pointer', () => {
      pointerView.updateEventListeners()
      document.dispatchEvent(moveUpPointer)
      expect(document.dispatchEvent(moveUpPointer)).toBeTruthy();
    });
  });

}

