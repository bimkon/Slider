/* eslint-disable no-console */
import { SliderOptions } from '../types';

export const isNumber = (value: unknown): value is number => Number.isFinite(value);

export const normalizeConfig = (values: unknown): SliderOptions => {
  let viewConfig: SliderOptions = {};
  if (typeof values === 'object' && values !== null) {
    const massiveOfNewValues = Object.entries(values);
    massiveOfNewValues.forEach(([key, value]) => {
      switch (key) {
        case 'hasTip':
        case 'isVertical':
        case 'isRange':
          if (typeof value === 'boolean') {
            viewConfig = { ...viewConfig, [key]: value };
          } else {
            console.error('isRange wrong type');
          }
          break;
        case 'min':
          if (isNumber(value)) {
            viewConfig = { ...viewConfig, [key]: value };
          } else {
            console.error('min wrong type');
          }

          break;
        case 'max':
          if (isNumber(value)) {
            viewConfig = { ...viewConfig, [key]: value };
          } else {
            console.error('max wrong type');
          }

          break;
        case 'step':
          if (isNumber(value)) {
            viewConfig = { ...viewConfig, [key]: value };
          } else {
            console.error('step wrong type');
          }

          break;
        case 'from':
          if (isNumber(value)) {
            viewConfig = { ...viewConfig, [key]: value };
          } else {
            console.error('from wrong type');
          }

          break;
        case 'numberOfStrokes':
          if (isNumber(value)) {
            viewConfig = { ...viewConfig, [key]: value };
          } else {
            console.error('numberOfStrokes wrong type');
          }

          break;
        case 'to':
          if (isNumber(value)) {
            viewConfig = { ...viewConfig, [key]: value };
          } else {
            console.error('to wrong type');
          }

          break;
        default:
          return null;
      }
      return null;
    });
  }
  return viewConfig;
};
