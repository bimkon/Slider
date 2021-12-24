import { SliderOptions } from './types';

const defaultOptions: Required<SliderOptions> = {
  isRange: false,
  min: 2,
  max: 100,
  step: 1,
  isVertical: false,
  from: 20,
  to: 85,
  hasTip: false,
  numberOfStrokes: 3,
};

export default defaultOptions;
