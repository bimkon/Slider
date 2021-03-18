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
    // this.view.sliderPath.initMouseMoves();
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
  pointerToMove: string;
  
}) {
  const {position, pointerToMove} = data;
  console.log(pointerToMove)
  this.model.applyValue(position, pointerToMove);

}
@bind
private updatePointerPosition(data: {
  from: number;
  to: number;
  fromPointerValue: number;
  fromInPercents: number;
  toPointerValue: number;
  toInPercents: number;
  

  
}) {
  const { from, to,  fromPointerValue,  fromInPercents, toPointerValue, toInPercents } = data;

  this.view.setPointerPosition({
    from,
    to,
    fromPointerValue: fromPointerValue,
    fromPointerInPercents: fromInPercents,
    options:  this.getOptions(),
  });

  
}






}

 


export { Presenter };