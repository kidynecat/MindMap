import { Component, OnInit, Input,ComponentFactoryResolver,ViewChild } from '@angular/core';

import {MindLabelItemComponent} from '../mind-label-item/mind-label-item.component'
import {LabelDirectiveDirective} from '../label-directive.directive'
import * as SysMethod from '../sys-method'
import * as $ from 'jquery'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  @Input() MindLabelItem:MindLabelItemComponent
  @ViewChild(LabelDirectiveDirective) appLabel: LabelDirectiveDirective;
  constructor() { }

  ngOnInit() {
    
    $("#MainScreen").bind('resize', function(e) {      

      //alert('element now contains: ' + $(e.target).html());  
      //console.log('1')
      SysMethod.default.reflashCanvas()
   });


   
  
  }








  public reflashCanvas(){
    SysMethod.default.reflashCanvas()
  }
  

}
