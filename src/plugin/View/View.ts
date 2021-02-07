import { SliderOptions } from '../SliderOptions';

class View {
  options: SliderOptions;
  $el: HTMLElement;

  // SVPoint: SVPoint;
  // SVRange: SVRange;
  // SVLine: SVLine;
  // =============

  setOptions(options: SliderOptions) {
    this.options = options
    console.log('Options were set')
  }

  initProps() {
    this.$el = document.getElementById(this.options.id)
    console.log('Properties init completed')
  }

  render(template:any) {
    this.$el.innerHTML = template
    console.log('Template uploaded');
  }

  initComponents() {
    // this.SVPoint = new SVPoint(this)
    // this.SVRange = new SVRange(this)
    // this.SVLine = new SVLine(this)

    // this.SVPoint.start()
    // this.SVRange.start()
    // this.SVLine.start()

    console.log('Components init completed')
  }
}
// =========== EXPORT ===========
export { View };