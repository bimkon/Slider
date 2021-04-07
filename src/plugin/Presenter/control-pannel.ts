import '../myslider';
import { SliderOptions } from '../SliderOptions';

class Control {
  slider: JQuery<Object>;

  constructor( ) {
    this.slider = $('.js-range-slider');
    this.addEventListeners();

  }
  addEventListeners() {
    const selectImput = document.querySelector('.inputerino');
    console.log(selectImput)
    selectImput.addEventListener('change', (event:any) => {
      const value = (event.target.value);
      console.log(value)
      $('.bimkon-slider').bimkonSlider('update', {from:value})
      });
      $('.bimkon-slider').bimkonSlider('callbackOnUpdate', (options: SliderOptions) => {
        const {from} = options;
        $('.someInputId').val(30);
        console.log(from)
      
    }
  }
}



export {Control};
