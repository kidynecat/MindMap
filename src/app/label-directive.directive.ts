import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[app-label]'
})
export class LabelDirectiveDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
