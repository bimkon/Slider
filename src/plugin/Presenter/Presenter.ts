import bind from 'bind-decorator';
import { Model } from '../Model/Model';
import { MainView } from '../View/MainView/MainView';
import { SliderOptions } from '../SliderOptions';
import { SliderPath } from '../View/SliderPath/SliderPath';



class Presenter {
  view: MainView;
  model: Model;
  options: SliderOptions;


  constructor(view: MainView, model: Model, options?: SliderOptions) {
    this.view = view;
    this.model = model;
    this.addObservers();
    this.getOptions();
    this.model.setSettings(options)



 }
@bind
 getOptions () {
   return this.model.getSettings();
 }
 @bind
 callbackOnUpdate(fn: Function) {
   this.model.optionsObserver.subscribe(() => fn(this.model.getSettings()));
 }
 update (settings:SliderOptions) {
  console.log(settings);
  this.model.setSettings(settings);
}

 private addObservers() {
   this.view.sliderPath.observer.subscribe(this.updateValueInModel);
   this.model.observerOfValues.subscribe(this.updatePointerPosition);
   this.model.optionsObserver.subscribe(this.updateBooleanOptions);

 }

@bind
private updateValueInModel(data: {
  position: number;
  pointerToMove: string;  
  
}) {
  const {position, pointerToMove} = data;
  this.model.applyValue(position, pointerToMove);

}
@bind
private updatePointerPosition(data: {
  fromPointerValue: number;
  fromInPercents: number;
  toPointerValue: number;
  toInPercents: number;

}) {
  const {fromPointerValue,  fromInPercents, toPointerValue, toInPercents } = data;

  this.view.setPointerPosition({
    fromPointerValue,
    fromInPercents,
    toPointerValue,
    toInPercents,
    options:  this.getOptions(),
  });

  
}
@bind
updateBooleanOptions(data: {
  hasTip:boolean,
  isVertical:boolean,
  isRange:boolean,
}) {
  this.view.updateBooleanOptions(data);
}




}

 


export { Presenter };