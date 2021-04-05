import { Model } from '../plugin/Model/Model';
import { MainView } from './View/MainView/MainView';
import { Presenter } from '../plugin/Presenter/Presenter';
import { SliderOptions } from './SliderOptions';



declare global {
  interface Window {
    $: JQuery;
  }
  interface JQuery {
    bimkonSlider: (
      options?: SliderOptions | 'update'
    ) => JQuery<Element> | JQuery<Object>;
    update: (
      options?: SliderOptions | 'update'
    ) => JQuery<Element> | JQuery<Object>;
    
  }
}

(function($) {
  let methods = {
    init: function(options: SliderOptions) {
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
      this.presenter = new Presenter(view, model, options,)

    },
    update: function(options:string) {


    }
  }
  $.fn.extend({
    bimkonSlider: function(method:string, params: string ) {
      if ( methods[method] ) {
        return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
      } else if ( typeof method === 'object' || ! method ) {
        return methods.init.apply( this, arguments );
      } else {
        $.error( 'Метод с именем ' +  method + ' не существует в плагине' );
      }    
  }})
}(jQuery));



$('.bimkon-sliderino').bimkonSlider({
  isRange: true,
  min: 0,
  max: 100,
  step: 1,
  isVertical: true,
  from: 30,
  to: 70,
  hasTip: true,

});
