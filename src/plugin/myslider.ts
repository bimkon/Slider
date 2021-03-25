import { Model } from '../plugin/Model/Model';
import { MainView } from './View/MainView/MainView';
import { Presenter } from '../plugin/Presenter/Presenter';
import { SliderOptions } from './SliderOptions';
import { SliderPath } from './View/SliderPath/SliderPath';


declare global {
  interface Window {
    $: JQuery;
  }
  interface JQuery {
    bimkonSlider: (
      options?: SliderOptions
    ) => JQuery<Element> | JQuery<Object>;
  }
}

(function($) {
  $.fn.extend({
    bimkonSlider: function(options: SliderOptions) {
      options = $.extend({
        isRange: false,
        min: 0,
        max: 100,
        step: 20,
        isVertical: false,
        from: 0,
        to: 20,
        hasTip: false,
         }, options);
      const model = new Model(options)
      const view = new MainView(options)
      const presenter = new Presenter(view, model, options)
  }})
}(jQuery))

$('.bimkon-slider').bimkonSlider({
  isRange: true,
  min: 0,
  max: 100,
  step: 1,
  isVertical: false,
  from: 30,
  to: 70,
  hasTip: true,

})