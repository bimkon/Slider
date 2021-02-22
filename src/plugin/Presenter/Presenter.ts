import { Model } from '../Model/Model';
import { MainView } from '../View/MainView/MainView';
import { SliderOptions } from '../SliderOptions';


class Presenter {
  view: MainView;
  model: Model;


  constructor(view: MainView, model: Model, options: SliderOptions) {
    this.view = view;
    this.model = model;
    this.view.sliderPath.initMouseMoves();
    // this.addObservers();
    const {
      isRange, min, max, step, isVertical, from, to, hasTip,} = options;
    console.log(this.model.getSettings());
    console.log({
      isRange, min, max, step, isVertical, from, to, hasTip,});
      this.view.InitMinMaxValues();
 }
 
//  private addObservers() {
//   this.model.observerOfValues.subscribe(number => {
//     this.view.sliderPath.thumb.tip.setTipValue(number);
//   });
//  }
 private updateValuePointer (data:number)
    {
      const from = data;
      console.log('123');
    
      this.view.sliderPath.thumb.tip.setTipValue(25);
      alert(from);
 }







}

 


export { Presenter };