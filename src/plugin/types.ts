import SliderOptions from "./SliderOptions";

type Direction = 'top' | 'left';
type EventClientOrientation = 'clientY' | 'clientX';
type OffsetParameter = 'offsetHeight' | 'offsetWidth';
type StyleOrientation = 'height' | 'width';
export type Axis = {
  direction: Direction
  eventClientOrientation: EventClientOrientation,
  offsetParameter: OffsetParameter,
  styleOrientation: StyleOrientation,
};

export type Methods = 'update' | 'callbackOnUpdate';
export type TypeOfArgument = SliderOptions | ((options: SliderOptions) => SliderOptions);
export type ContactList = {
  [key: string]: {
    value: boolean | number;
  },
};