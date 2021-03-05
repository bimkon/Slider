import bind from 'bind-decorator';
import { Model } from '../Model/Model';
import { MainView } from '../View/MainView/MainView';
import { SliderOptions } from '../SliderOptions';
import { SliderPath } from '../View/SliderPath/SliderPath';


class Presenter {
  view: MainView;
  model: Model;
  options: SliderOptions;


  constructor(view: MainView, model: Model, options: SliderOptions) {
    this.view = view;
    this.model = model;
    this.view.sliderPath.initMouseMoves();
    this.addObservers();
    this.getOptions();



 }
@bind
 getOptions () {
   return this.model.getSettings();
 }


 private addObservers() {
   this.view.sliderPath.observer.subscribe(this.updateValueInModel);
   this.model.observerOfValues.subscribe(this.updatePointerPosition);

 }

@bind
private updateValueInModel(data: {
  position: number;
}) {
  const {position} = data;

  this.model.calculateValues(position);
}
@bind
private updatePointerPosition(data: {
  min: number,
  max: number,
  fromPointerValue: number,
  fromInPercents: number,

  
}) {
  const { min, max,  fromPointerValue,  fromInPercents, } = data;

  this.view.setPointerPosition({
    min: min,
    max: max,
    fromPointerValue: fromPointerValue,
    fromPointerInPercents: fromInPercents,
    options:  this.getOptions(),
  });

  
}






}

 


export { Presenter };