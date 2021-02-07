import { Model } from '../plugin/Model/Model';
import { View } from '../plugin/View/View';
import { Presenter } from '../plugin/Presenter/Presenter';
import { SliderOptions } from './SliderOptions';


declare global {
  interface Window {
    $: JQuery;
  }
  interface JQuery {
   iceSlider: (
      options?: SliderOptions
    ) => JQuery<Element> | JQuery<Object>;
  }
}

(function($) {
  $.fn.extend({
    iceSlider: function(options: SliderOptions) {
      const model = new Model()
      const view = new View()
      const presenter = new Presenter(view, model, options)
  }})
}(jQuery))

$('.ice-slider').iceSlider({
  id: 'ice-slider',
  // pointSize: 16
})