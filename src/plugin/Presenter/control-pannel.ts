import '../myslider';
import { SliderOptions } from '../SliderOptions';

class Control {
  slider: JQuery<Object>;

  constructor( paremetrs: SliderOptions ) {
    this.slider = $('.js-range-slider');
    // this.initSlider(paremetrs);

  }
  // initSlider(settings?: SliderOptions) {
  //   this.slider.bimkonSlider(settings)
  // }
  setSettings(setting: string, value: string | number | boolean) {
    const settings:SliderOptions = {};
    settings[setting] = value;
    this.slider.bimkonSlider('update', settings);
  }

}



export {Control}
