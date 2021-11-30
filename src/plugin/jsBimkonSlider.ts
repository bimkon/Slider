/* eslint-disable no-param-reassign */
import { UPD } from './types';
import { normalizeConfig } from './typeguards/typeguards';
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
  const methods: UPD = {
    update(settings: SliderOptions) {
      const presenter: Presenter = this.data('presenter');
      presenter.update(settings);
    },
    callbackOnUpdate(fn: Function) {
      const presenter: Presenter = this.data('presenter');
      presenter.callbackOnUpdate(fn);
    },
  };
  $.fn.bimkonSlider = function getStart(config?, otherOptions?) {
    return this.map((_i: number, htmlElem: HTMLElement) => {
      const isObject = typeof config === 'object';
      if (isObject || !config) {
        const data: SliderOptions = $(htmlElem).data();
        const settings: SliderOptions = $.extend(data, config);
        const normalizedConfig : SliderOptions = normalizeConfig(settings);
        const extendedConfig: Required<SliderOptions> = $.extend(defaultOptions, normalizedConfig);
        const presenter: Presenter = new Presenter(htmlElem, extendedConfig);
        this.data('presenter', presenter);
        return this;
      }

      if (typeof config === 'string') {
        if (config === 'update' && typeof otherOptions === 'object') {
          const normalizedConfig : SliderOptions = normalizeConfig(otherOptions);
          return methods[config].call(this, normalizedConfig);
        }
        if (config === 'callbackOnUpdate'
         && typeof otherOptions
         === 'function') {
          return methods[config].call(this, otherOptions);
        }
      } else {
        $.error(`Method ${config} method do not exist or wrong type of the options`);
      }
      return null;
    });
  };
}(jQuery));
