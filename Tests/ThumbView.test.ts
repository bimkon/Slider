import { ThumbView } from '../src/plugin/View/ThumbView/ThumbView';
import '@testing-library/jest-dom';

document.body.innerHTML = '<div class="js-bimkon-slider__path-line"><div class="js-bimkon-slider__path"></div></div>';

const pathElement = document.querySelector('.js-bimkon-slider__path') as HTMLElement;
const pointerView = new ThumbView(pathElement);

describe('View / Slider Pointer / Test of setting and methods', () => {
  beforeEach(() => {
    pathElement.style.width = '400Px';
  });

  it('Slider pointer should be set', () => {
    expect(pointerView).toBeDefined();
  });

  it('Should update pointer position', () => {
    pointerView.updatePointerPosition(30, {isVertical:false})
    expect(Math.round(parseInt(pointerView.thumbElement.style.left, 10))).toBeCloseTo(30)
  });

  it('Should update pointer position', () => {
    pointerView.updatePointerPosition(30, {isVertical:true})
    expect(Math.round(parseInt(pointerView.thumbElement.style.top, 10))).toBeCloseTo(30)
  });

  it('Should call updateEventListeners', () => {
    pointerView.bindEventListeners = jest.fn();
    pointerView.updateEventListeners(false,false);
    expect(pointerView.bindEventListeners).toBeCalled();
  });      
})
  
describe('testing of mouseEvents',()=>{
  let clickOnSlider = new MouseEvent('mousedown',{
      clientX:100,
      clientY: 0,
  });

  const moveOnPointer = new MouseEvent('mousemove',{
    clientX: 101,
    clientY: 0
  });
  const moveUpPointer = new MouseEvent('mouseup');


  it('Should check moveUP on Pointer', () => {
    pointerView.dispatchThumbPosition = jest.fn();
    pointerView.thumbElement.dispatchEvent(clickOnSlider)
    pointerView.thumbElement.dispatchEvent(moveOnPointer)
    expect(pointerView.dispatchThumbPosition).toHaveBeenCalledTimes(2);
  });


    // it('Should check click', () => {
  //   pointerView.mouseDown(true,true, clickOnSlider)
  //   expect(pointerView.thumbElement.dispatchEvent(clickOnSlider)).toBeTruthy();
  // });

  // it('Should check click', () => {
  //   pointerView.mouseDown(false,false, clickOnSlider)
  //   expect(pointerView.thumbElement.dispatchEvent(clickOnSlider)).toBeTruthy();
  // });

  // it('Should check move on Pointer', () => {
  //   pointerView.onMouseMove(true,true, moveOnPointer)
  //   expect(pointerView.thumbElement.dispatchEvent(moveOnPointer)).toBeTruthy();
  // });

  // it('Should check move on Pointer', () => {
  //   pointerView.onMouseMove(false,false, moveOnPointer)
  //   expect(pointerView.thumbElement.dispatchEvent(moveOnPointer)).toBeTruthy();
  // });

});


