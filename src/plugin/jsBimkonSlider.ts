/* eslint-disable no-param-reassign */
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
  const methods = {
    update(this: JQuery<HTMLElement>, settings: SliderOptions) {
      const presenter: Presenter = this.data('presenter');
      presenter.update(settings);
    },
    callbackOnUpdate(this: JQuery<HTMLElement>, fn: Function) {
      const presenter: Presenter = this.data('presenter');
      presenter.callbackOnUpdate(fn);
    },
  };
  $.fn.bimkonSlider = function getStart(config?, otherOptions?) {
    return this.map((_i: number, htmlElem: HTMLElement) => {
      if (typeof config === 'object' || !config) {
        const data: SliderOptions = $(htmlElem).data();
        const settings: SliderOptions = $.extend(data, config);
        const normalizedConfig : SliderOptions = normalizeConfig(settings);
        const extendedConfig: Required<SliderOptions> = $.extend(defaultOptions, normalizedConfig);
        const presenter: Presenter = new Presenter(htmlElem, extendedConfig);
        this.data('presenter', presenter);
        return this;
      }
      const isRightMethod = config === 'update' || config === 'callbackOnUpdate';
      if (typeof config === 'string' && isRightMethod) {
        if (config === 'update' && typeof otherOptions === 'object') {
          return methods[config].call(this, normalizeConfig(otherOptions));
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
