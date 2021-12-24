export type Axis = {
  direction: 'top' | 'left';
  eventClientOrientation: 'clientY' | 'clientX';
  offsetParameter: 'offsetHeight' | 'offsetWidth';
  styleOrientation:'height' | 'width';
};

export interface SliderOptions {
  isRange?: boolean;
  min?: number;
  max?: number;
  step?: number;
  isVertical?: boolean;
  from?: number;
  to?: number;
  hasTip?: boolean;
  numberOfStrokes?: number;
}
