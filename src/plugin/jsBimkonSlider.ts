/* eslint-disable no-param-reassign */
import { normalizeConfig } from './typeguards/typeguards';
import Presenter from './presenter/Presenter';
import { SliderOptions } from './types';
import defaultOptions from './defaultOptions';

declare global {
  interface Window {
    $: JQuery;
  }
  interface JQuery {
    bimkonSlider: (config?: unknown, otherOptions?: unknown) => void;
  }
}

(function initialization($: JQueryStatic) {
  const methods = {
    update(this: JQuery<HTMLElement> | undefined, settings: SliderOptions) {
      if (this !== undefined) {
        const presenter: Presenter = this.data('presenter');
        presenter.update(settings);
      } else {
        $.error(
          'slider has to be initialized before call this method, otherwise return type this | undefined',
        );
      }
      return this;
    },
    callbackOnUpdate(this: JQuery<HTMLElement> | undefined, fn: Function) {
      if (this !== undefined) {
        const presenter: Presenter = this.data('presenter');
        presenter.callbackOnUpdate(fn);
      } else {
        $.error(
          'slider has to be initialized before call this method, otherwise return type this | undefined',
        );
      }

      return this;
    },
  };
  $.fn.bimkonSlider = function getStart(config?, otherOptions?) {
    return this.map((_i: number, htmlElem: HTMLElement) => {
      if (typeof config === 'object' || !config) {
        const data = $(htmlElem).data();
        const settings = $.extend(data, config);
        const normalizedConfig = normalizeConfig(settings);
        const extendedConfig = $.extend(defaultOptions, normalizedConfig);
        const presenter = new Presenter(htmlElem, extendedConfig);
        this.data('presenter', presenter);
        return this;
      }
      const isRightMethod = config === 'update' || config === 'callbackOnUpdate';
      if (isRightMethod) {
        if (config === 'update' && typeof otherOptions === 'object') {
          return methods[config].call(this, normalizeConfig(otherOptions));
        }
        if (
          config === 'callbackOnUpdate'
          && typeof otherOptions === 'function'
        ) {
          return methods[config].call(this, otherOptions);
        }
      } else {
        $.error(`Method ${config}  do not exist or wrong type of the options`);
      }
      return null;
    });
  };
}(jQuery));
