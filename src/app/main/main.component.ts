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
  @ViewChild('rootlabel') rootLabel: MindLabelItemComponent;
  constructor() { }

  ngOnInit() {
    
    $("#MainScreen").bind('resize', function(e) {      

      //alert('element now contains: ' + $(e.target).html());  
      //console.log('1')
      SysMethod.default.reflashCanvas()
   });


   
  
  }



   reflashCanvas(){
    SysMethod.default.reflashCanvas()
  }

  private tmpSaveData :MindSaveData
  //保存
  saveData(){
    this.tmpSaveData = new MindSaveData()
    this.getloopData(this.tmpSaveData,this.rootLabel)
    //console.log(this.tmpSaveData)
    console.log(JSON.stringify(this.tmpSaveData))
  }

  //递归获取数据
  getloopData(tdata:MindSaveData,mit:MindLabelItemComponent){
    tdata.data = this.deepCopy( mit.data)
    tdata.childrenData = []
    for(let i = 0 ; i < mit.childrenComponentRefs.length; i ++)
    {
      
      tdata.childrenData.push(new MindSaveData())
      this.getloopData(tdata.childrenData[i],mit.childrenComponentRefs[i].instance)
    }
  }

  //加载
  loadData(){
    this.rootLabel.clearComponent()
    console.log(this.tmpSaveData)
    if(this.tmpSaveData != null)
    {
      this.loadLoopData(this.tmpSaveData,this.rootLabel)
    }
    
  }

  //递归加载
  private loadLoopData(tdata:MindSaveData,mit:MindLabelItemComponent){
    mit.setMemo(tdata.data.memoValue) 
    for(let i = 0;i < tdata.childrenData.length ; i++)
    {
      let cmit = mit.addChildComponent()
      this.loadLoopData(tdata.childrenData[i],cmit)
    }
  }


  private deepCopy(obj){
    var newObj = {};
    for(let vl in obj){
        if(typeof obj[vl] === 'object' && obj[vl] !== null){
            newObj[vl] = this.deepCopy(obj[vl]);
        }else{
            newObj[vl] = obj[vl];
        }       
    }
    return newObj;
}

  
}

class MindSaveData{
  public data:any

  public childrenData:MindSaveData[]

  constructor(){

  }
}
