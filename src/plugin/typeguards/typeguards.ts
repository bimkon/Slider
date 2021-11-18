import SliderOptions from '../SliderOptions';
import SliderPath from '../View/SliderPath/SliderPath';

export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

export const isNumber = (value: unknown): value is number => typeof value === 'number'
 && Number.isFinite(value);

export const isCallBackFunction = (fn: Function) : fn is ((options: SliderOptions) => SliderOptions) => {
  if (typeof fn === 'function') return true;
  return false;
};

export const normalizeConfig = (values: unknown): SliderOptions => {
  let viewConfig: SliderOptions = {};
  if (typeof values === 'object' && values !== null) {
    const massiveOfNewValues = Object.entries(values);
    massiveOfNewValues.forEach(([key, value]) => {
      switch (key) {
        case 'hasTip':
        case 'hasLine':
        case 'isVertical':
        case 'isRange':
          if (isBoolean(value)) viewConfig = { ...viewConfig, [key]: value };
          else console.error('isRange wrong type');
          break;
        case 'min':
          if (isNumber(value)) viewConfig = { ...viewConfig, [key]: value };
          else console.error('min wrong type');
          break;
        case 'max':
          if (isNumber(value)) viewConfig = { ...viewConfig, [key]: value };
          else console.error('max wrong type');
          break;
        case 'step':
          if (isNumber(value)) viewConfig = { ...viewConfig, [key]: value };
          else console.error('step wrong type');
          break;
        case 'from':
          if (isNumber(value)) viewConfig = { ...viewConfig, [key]: value };
          else console.error('from wrong type');
          break;
        case 'numberOfStrokes':
          if (isNumber(value)) viewConfig = { ...viewConfig, [key]: value };
          else console.error('numberOfStrokes wrong type');
          break;
        case 'to':
          if (isNumber(value)) viewConfig = { ...viewConfig, [key]: value };
          else console.error('to wrong type');
          break;
        default:
          return null;
      }
      return null;
    });
  }
  return viewConfig;
};

// export const isNormalized = (values: any): values is SliderOptions => typeof values.isRange
//  === 'boolean'
// && typeof values.min === 'number'
// && typeof values.max === 'number'
// && typeof values.step === 'number'
// && typeof values.isVertical === 'boolean'
// && typeof values.from === 'number'
// && typeof values.to === 'number'
// && typeof values.hasTip === 'boolean'
// && typeof values.numberOfStrokes === 'number';
