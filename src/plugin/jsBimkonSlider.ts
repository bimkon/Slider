import { isNormalized } from './typeguards/typeguards';
/* eslint-disable no-param-reassign */
import Presenter from './Presenter/Presenter';
import SliderOptions from './SliderOptions';

declare global {
  interface Window {
    $: JQuery;
  }
  interface JQuery {
    bimkonSlider: (
      config?: unknown,
      otherOptions?: SliderOptions | ((options: SliderOptions) => void)
    ) => void;
  }
}

(function initialization($: JQueryStatic) {
  $.fn.bimkonSlider = function getStart(config?, otherOptions?) {
    return this.map((_i: number, htmlElem: HTMLElement) => {
      const isNormalObject = typeof config === 'object' && isNormalized(config);
      if (isNormalObject || !config) {
        const data: SliderOptions = $(htmlElem).data();
        const settings: SliderOptions = $.extend(data, config);
        const presenter: Presenter = new Presenter(htmlElem, settings);
        this.data('presenter', presenter);
        return this;
      }

      const presenter: Presenter = this.data('presenter');

      if (typeof config === 'string' && presenter) {
        const isCallBackFunction = presenter[config] && config === 'callbackOnUpdate';
        const isEmptyOrNormalParameter = (presenter[config] && jQuery.isEmptyObject(otherOptions))
          || (presenter[config] && otherOptions);
        if (isEmptyOrNormalParameter || isCallBackFunction) {
          return presenter[config].call(presenter, otherOptions);
        }
        $.error(`Method ${config} method do not exist or wrong type of the options`);
      } else {
        $.error('To call methods the slider should be initialized');
      }
      return null;
    });
  };
}(jQuery));
