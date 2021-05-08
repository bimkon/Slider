import { SliderPath } from '../src/plugin/View/SliderPath/SliderPath';
import '@testing-library/jest-dom';


const sliderPath = new SliderPath();

describe('SliderPath testing/ testing of setting', () => {

  it('should set SliderPath', () => {
    expect(sliderPath).toBeDefined();
  });

});

describe('Testing of methods', () => {

  it('should set single slider', () => {
    sliderPath.makeSingle();
    expect(sliderPath.scale).toBeDefined();
  });

  it('should set range slider', () => {
    sliderPath.makeRange();
    expect(sliderPath.toValuePointer).toBeDefined();
    expect(sliderPath.scale).toBeDefined();
  });

  it('should set range slider', () => {
    sliderPath.makeRange();
    expect(sliderPath.toValuePointer).toBeDefined();
    expect(sliderPath.scale).toBeDefined();
  });


  it('should set pointer position', () => {
    const options = {
      isRange: true,
      isVertical: true,
    };
    sliderPath.setPointerPosition({fromInPercents:50, toInPercents: 100, options});
    expect(sliderPath.fromValuePointer.position).toEqual(50);
    expect(sliderPath.toValuePointer.position).toEqual(100);
  });

  it('should update range line', () => {
    const options = {
      isRange: true,
      isVertical: true,
    };
    sliderPath.updateRangeLine(options,50, 100,);
    expect(sliderPath.rangePathLine.pathLine.style.top).toEqual(`${50}%`);
    expect(sliderPath.rangePathLine.pathLine.style.height).toEqual(`${50}%`);
  });

  it('should update range line/false options', () => {
    const options = {
      isRange: false,
      isVertical: false,
    };
    sliderPath.updateRangeLine(options,50, 100,);
    expect(sliderPath.rangePathLine.pathLine.style.left).toEqual(`${0}%`);
    expect(sliderPath.rangePathLine.pathLine.style.width).toEqual(`${50}%`);
});

it('should update range line/true falso options', () => {
  const options = {
    isRange: true,
    isVertical: false,
  };
  sliderPath.updateRangeLine(options,50, 100,);
  expect(sliderPath.rangePathLine.pathLine.style.top).toEqual(`${50}%`);
  expect(sliderPath.rangePathLine.pathLine.style.height).toEqual(`${50}%`);
});

it('should update range line/false options', () => {
  const options = {
    isRange: false,
    isVertical: true,
  };
  sliderPath.updateRangeLine(options,50, 100,);
  expect(sliderPath.rangePathLine.pathLine.style.left).toEqual(`${50}%`);
  expect(sliderPath.rangePathLine.pathLine.style.width).toEqual(`${50}%`);
});

it('Should call bindEventListenersToScale', () => {
  sliderPath.bindEventListenersToScale = jest.fn();
  sliderPath.updateEventListenersToScale(5,5,false,false);
  expect(sliderPath.bindEventListenersToScale).toHaveBeenCalledTimes(1)
}); 

});

describe('testing of mouseEvents',()=> {
  
  let clickOnSlider = new MouseEvent('mousedown');
  const moveOnPointer = new MouseEvent('mousemove', { bubbles: true, clientX: 101 });
  const moveUpPointer = new MouseEvent('mouseup');
  // sliderPath.rangePathLine.emptyBar.dispatchEvent(clickOnSlider);
  // document.dispatchEvent(moveOnPointer);
  // document.dispatchEvent(moveUpPointer);

let mouseDownEvent = new Event('mousedown', {bubbles:true});

  it('Should call dispatchThumbPosition', () => {
    // sliderPath.updateEventListenersToScale(5,5,false,false);
    sliderPath.dispatchThumbPosition= jest.fn();
    sliderPath.scale.scale.dispatchEvent(mouseDownEvent);
    // sliderPath.showNumber(0,20,true,true, clickOnSlider)
    sliderPath.dispatchThumbPosition({position:20, pointerToMove: sliderPath.fromValuePointer})
    expect(sliderPath.dispatchThumbPosition).toHaveBeenCalledTimes(2)
  }); 



  // it('Should check click', () => {
  //   sliderPath.mouseDown(true, true, clickOnSlider);
  //   expect(sliderPath.scale.scale.dispatchEvent(clickOnSlider)).toBeTruthy();
  // });
  


  // it('1111111111', () => {
  //   const ev = new Event('mousedown');
  //    sliderPath.bindEventListenersToScale = jest.fn();
  //    sliderPath.updateEventListenersToScale
  //   //  sliderPath.rangePathLine.emptyBar.dispatchEvent(clickOnSlider)
  //   expect(sliderPath.bindEventListenersToScale).toBeCalled();
  // }); 

  // it('Should check click', () => {
  //   sliderPath.mouseDown(false, false, clickOnSlider);
  //   expect(sliderPath.scale.scale.dispatchEvent(clickOnSlider)).toBeTruthy();
  // });

  // it('Should check move on Pointer', () => {
  //   sliderPath.onMouseMove(true,true, moveOnPointer)
  //   expect(sliderPath.scale.scale.dispatchEvent(moveOnPointer)).toBeTruthy();
  // });

  // it('Should check move on Pointer', () => {
  //   sliderPath.onMouseMove(false,false, moveOnPointer)
  //   expect(sliderPath.scale.scale.dispatchEvent(moveOnPointer)).toBeTruthy();
  // });

  // it('Should check moveUP on Pointer', () => {
  //   sliderPath.scale.scale.dispatchEvent(moveUpPointer)
  //   expect(sliderPath.scale.scale.dispatchEvent(moveUpPointer)).toBeTruthy();
  // });  

 
});


