import { Component, OnInit, ViewChild, ComponentFactoryResolver, ElementRef, Renderer2 } from '@angular/core';
import { LabelDirectiveDirective } from '../label-directive.directive'
import * as rxjs from 'rxjs'
import { debounceTime, map } from 'rxjs/operators'


import sysMethod, * as SysMethod from '../sys-method'

import * as $ from 'jquery'
import * as resizeDetector from 'resize-detector'


@Component({
  selector: 'app-mind-label-item',
  templateUrl: './mind-label-item.component.html',
  styleUrls: ['./mind-label-item.component.css']
})
export class MindLabelItemComponent implements OnInit {
  @ViewChild(LabelDirectiveDirective) appLabel: LabelDirectiveDirective;
  @ViewChild('clearbtn') clearbtn;
  @ViewChild('chlidrenlabels') chlidrenlabels:ElementRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private renderer2: Renderer2
  ) { }

  public data: any = {
    levename: "root",
    childrenCount: 0
  }

  //private resizeSubscription: rxjs.Subscription //监听事件

    private resizecallback(){
      SysMethod.default.reflashCanvas()
    }

  ngOnInit() {

    //使用rxjs
    // console.log(this.chlidrenlabels)
    // console.dir(this.chlidrenlabels)
    // this.resizeSubscription = rxjs.fromEvent(this.chlidrenlabels.nativeElement, 'click')
    //   .pipe(
    //     debounceTime(100), // 加点去抖，毕竟 `resize` 频率非常高
    //     map(event => console.log(event))
    //   )
    //   .subscribe((event) => {

    //   });

    resizeDetector.addListener(this.chlidrenlabels.nativeElement,this.resizecallback)

  }


  ngOnDestroy(): void {
    //this.resizeSubscription.unsubscribe()
    resizeDetector.removeListener(this.chlidrenlabels.nativeElement,this.resizecallback)
  }


  



  loadComponent() {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(MindLabelItemComponent);

    let viewContainerRef = this.appLabel.viewContainerRef;

    let componentRef = viewContainerRef.createComponent(componentFactory);

    if (this.data.levename == "root") {
      this.data.childrenCount++
      (<MindLabelItemComponent>componentRef.instance).data = { levename: this.data.childrenCount.toString(), childrenCount: 0 }
    }
    else {
      this.data.childrenCount++
      (<MindLabelItemComponent>componentRef.instance).data = { levename: this.data.levename + '.' + this.data.childrenCount.toString(), childrenCount: 0 }
    }

    sysMethod.IsNeedReflash = true

  }

  clearComponent() {

    this.data.childrenCount = 0
    let viewContainerRef = this.appLabel.viewContainerRef;
    let i = viewContainerRef.length;
    // for(i;i>0;i--){
    //   viewContainerRef.remove(i-1)
    // }

    // for(let i = viewContainerRef.length -1;i>=0;i--)
    // {
    //   let ov = viewContainerRef.detach(i)
    // }

    
    viewContainerRef.clear()

    
    sysMethod.IsNeedReflash = true

    
  }

}
