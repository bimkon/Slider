import { TipView } from '../TipView/TipView';



 class ThumbView {
  public tip: TipView;
  public thumbElement: HTMLElement;


  
  
  
  
  constructor() {
    this.createTemplate();

  }
  private createTemplate() {
    this.thumbElement = document.createElement('div');
    this.thumbElement.classList.add('js-bimkon-slider__thumb');
    this.tip = new TipView();
    this.thumbElement.append(this.tip.tipElement);
    
  }







 








}

export { ThumbView };