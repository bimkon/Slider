import SliderOptions from './SliderOptions';
import defaultOptions from './Model/defaultOptions';

type Direction = 'top' | 'left';
type EventClientOrientation = 'clientY' | 'clientX';
type OffsetParameter = 'offsetHeight' | 'offsetWidth';
type StyleOrientation = 'height' | 'width';
export type Axis = {
  direction: Direction;
  eventClientOrientation: EventClientOrientation;
  offsetParameter: OffsetParameter;
  styleOrientation: StyleOrientation;
};

export interface Data {
  data(arg0: string): import('./Presenter/Presenter').default;
}

export interface UPD {
  update(this: Data, settings: SliderOptions): void;
  callbackOnUpdate(this: Data, fn: Function): void;
}

export type Keys = keyof typeof defaultOptions;
