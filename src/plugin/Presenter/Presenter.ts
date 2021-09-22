import bind from 'bind-decorator';
import  Model  from '../Model/Model';
import  MainView  from '../View/MainView/MainView';
import  SliderOptions  from '../SliderOptions';

class Presenter {
  view: MainView;

  model: Model;

  options: SliderOptions;

  constructor(view: MainView, model: Model, options?: SliderOptions) {
    this.view = view;
    this.model = model;
    this.addObservers();
    this.getOptions();
    this.model.setSettings(options);
  }

  @bind
  getOptions() {
    return this.model.getSettings();
  }

  @bind
  callbackOnUpdate(fn: (options: SliderOptions) => SliderOptions) {
    this.model.subscribe(() => fn(this.model.getSettings()));
  }

  update(settings:SliderOptions) {
    this.model.setSettings(settings);
  }

  private addObservers() {
    this.view.sliderPath.observer.subscribe(this.updateValueInModel);
    this.model.subscribe(this.updatePointerPosition);
  }

  @bind
  private updateValueInModel(data: {
    position: number;
    pointerToMove: string;

  }) {
    const { position, pointerToMove } = data;
    this.model.applyValue(position, pointerToMove);
  }

  @bind
  private updatePointerPosition(data: {
    fromPointerValue: number,
    fromInPercents: number,
    toPointerValue: number,
    toInPercents: number,
    hasTip:boolean,
    isVertical:boolean,
    isRange:boolean,

  }) {
    const {
      fromPointerValue, fromInPercents, toPointerValue, toInPercents,
    } = data;
    this.view.updateBooleanOptions(data);
    this.view.setPointerPosition({
      fromPointerValue,
      fromInPercents,
      toPointerValue,
      toInPercents,
      options: this.getOptions(),
    });
  }
}

export default  Presenter;
