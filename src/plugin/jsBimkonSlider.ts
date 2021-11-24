import { isCallBackFunction, normalizeConfig } from './typeguards/typeguards';
/* eslint-disable no-param-reassign */
import Presenter from './Presenter/Presenter';
import SliderOptions from './SliderOptions';
import defaultOptions from './Model/defaultOptions';

declare global {
  interface Window {
    $: JQuery;
  }
  interface JQuery {
    bimkonSlider: (
      config?: unknown,
      otherOptions?: unknown,
    ) => void;
  }
}

(function initialization($: JQueryStatic) {
  const methods = {
    update(settings: SliderOptions) {

      const presenter: Presenter = this.data('presenter');
      presenter.update(settings);
    },
    callbackOnUpdate(fn: (options: SliderOptions) => SliderOptions) {
      const presenter: Presenter = this.data('presenter');
      presenter.callbackOnUpdate(fn);

    },
  };
  $.fn.bimkonSlider = function getStart(config?, otherOptions?) {
    return this.map((_i: number, htmlElem: HTMLElement) => {
      const normalizedConfig = normalizeConfig(config, defaultOptions);
      const isObject = typeof config === 'object';
      if (isObject || !config) {
        const data: SliderOptions = $(htmlElem).data();
        const settings: SliderOptions = $.extend(data, normalizedConfig);
        const presenter: Presenter = new Presenter(htmlElem, settings);
        this.data('presenter', presenter);
        return this;
      }

      if (typeof config === 'string') {
        if (config === 'update' && typeof otherOptions === 'object') {
          const normalizedOtherOptions = normalizeConfig(otherOptions, defaultOptions);
          return methods[config].call(this, normalizedOtherOptions);
        }
        if (config === 'callbackOnUpdate'
         && typeof otherOptions
         === 'function'
          && isCallBackFunction(otherOptions)) {
          return methods[config].call(this, otherOptions);
        }
      } else {
        $.error(`Method ${config} method do not exist or wrong type of the options`);
      }
      return null;
    });
  };
}(jQuery));
