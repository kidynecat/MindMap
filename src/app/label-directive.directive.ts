import { Directive, ViewContainerRef,ContentChildren,QueryList, forwardRef } from '@angular/core';
import {MindLabelItemComponent} from './mind-label-item/mind-label-item.component'
@Directive({
  selector: '[app-label]'
})
export class LabelDirectiveDirective {
  @ContentChildren(forwardRef(() => MindLabelItemComponent),{read: ViewContainerRef}) children
  constructor(public viewContainerRef: ViewContainerRef) {
    
   }
   public getChildren(){
    return this.children
   }
}
