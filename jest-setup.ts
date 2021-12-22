/* eslint-disable import/no-extraneous-dependencies */

import $ from 'jquery';
import '@testing-library/jest-dom';

global.$ = $;
global.jQuery = $;
declare global {
  namespace NodeJS {
    interface Global {
      jQuery: JQueryStatic;
      $: JQueryStatic
    }
  }
}
