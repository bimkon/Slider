import { Model } from './Model/Model';
import { MainView } from './View/MainView/MainView';
import { Presenter } from './Presenter/Presenter';
import { SliderOptions } from './SliderOptions';

declare global {
  interface Window {
    $: JQuery;
  }
  interface JQuery {
    bimkonSlider: (
      options?: SliderOptions | 'update' | 'callbackOnUpdate',
      otherOptions?: SliderOptions | Function,
    ) => JQuery<Element> | JQuery<Object>;
  }
}

// eslint-disable-next-line func-names
(function ($: JQueryStatic) {
  // eslint-disable-next-line no-param-reassign
  $.fn.bimkonSlider = function getStart(options?, otherOptions?) {
    return this.map((_i: number, htmlElem: HTMLElement) => {
      if (typeof options === 'object' || !options) {
        const data: SliderOptions = $(htmlElem).data();
        const settings: SliderOptions = $.extend(data, options);
        const model = new Model(settings);
        const view = new MainView(htmlElem, settings);
        const presenter: Presenter = new Presenter(view, model, settings);
        this.data('presenter', presenter);
        return this;
      }

      const presenter: Presenter = this.data('presenter');

      if (typeof options === 'string' && presenter) {
        if (presenter[options]) {
          return presenter[options].call(presenter, otherOptions);
        }
        $.error(`Method ${options} method do not exist`);
      } else {
        $.error('To call methods the slider should be initialized');
      }
      return null;
    });
  };
}(jQuery));
