import bind from 'bind-decorator';
import { Model } from '../Model/Model';
import { MainView } from '../View/MainView/MainView';
import { SliderOptions } from '../SliderOptions';



class Presenter {
  view: MainView;
  model: Model;
  options: SliderOptions;


  constructor(view: MainView, model: Model, options?: SliderOptions) {
    this.view = view;
    this.model = model;
    // this.view.sliderPath.initMouseMoves();
    this.addObservers();
    this.getOptions();
    this.model.setSettings(options)



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






}

 


export { Presenter };