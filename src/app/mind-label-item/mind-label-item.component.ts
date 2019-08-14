import { Component, OnInit, ViewChild,ViewChildren,ContentChildren,ViewContainerRef, ComponentFactoryResolver,ComponentRef, ElementRef, Renderer2,QueryList } from '@angular/core';
import { LabelDirectiveDirective } from '../label-directive.directive'
import * as rxjs from 'rxjs'


import sysMethod, * as SysMethod from '../sys-method'

import * as resizeDetector from 'resize-detector' //第三方resize监听


@Component({
  selector: 'app-mind-label-item',
  templateUrl: './mind-label-item.component.html',
  styleUrls: ['./mind-label-item.component.css']
})
export class MindLabelItemComponent implements OnInit {
  @ViewChild(LabelDirectiveDirective) appLabel: LabelDirectiveDirective;
  @ViewChild('clearbtn') clearbtn;
  @ViewChild('childrenlabels') childrenlabels:ElementRef;
  //@ContentChildren(MindLabelItemComponent) children:QueryList<MindLabelItemComponent>
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private renderer2: Renderer2
  ) { }

  public data: any = {
    levename: "root",
    childrenCount: 0,
    labelType: "root", //root 和 node
    memoValue:""
  }

  //缓存子组件
  public childrenComponentRefs:Array<ComponentRef<MindLabelItemComponent>> = []

  //private resizeSubscription: rxjs.Subscription //监听事件

  private resizecallback(){
    SysMethod.default.reflashCanvas()
  }

  ngOnInit() {
    resizeDetector.addListener(this.childrenlabels.nativeElement,this.resizecallback)
  }


  ngOnDestroy(): void {
    resizeDetector.removeListener(this.childrenlabels.nativeElement,this.resizecallback)
  }

  //观察者 作为复组件 用于给子组件调用，删除自己
  private deleteChildObserver = {
    next: x => {
      console.log('childname: ' + x  +'| parentname: '+ this.data.levename)

      //this.children.length
      for(let i = this.childrenComponentRefs.length -1;i>=0;i--){
        // if(viewContainerRef[i].data.levename == x)
        // viewContainerRef.remove(i-1)
        if( (<MindLabelItemComponent>this.childrenComponentRefs[i].instance).data.levename == x)
        {
          this.childrenComponentRefs[i].destroy()
          this.childrenComponentRefs.splice(i,1)
        }

        //console.log((<MindLabelItemComponent>this.childrenComponentRefs[i].instance).data.levename)
      }
      sysMethod.IsNeedReflash = true

  },
    error: err => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
  };

  public closeSubject: rxjs.Subject<any> = new rxjs.Subject<any>();

  public closeObservable(): rxjs.Observable<any>{
    return this.closeSubject.asObservable()
  }
  

  loadComponent() {
    // let componentFactory = this.componentFactoryResolver.resolveComponentFactory(MindLabelItemComponent);

    // let viewContainerRef = this.appLabel.viewContainerRef;

    // let componentRef = viewContainerRef.createComponent(componentFactory);

    // this.childrenComponentRefs.push(componentRef)

    // if (this.data.levename == "root") {
    //   this.data.childrenCount++
    //   (<MindLabelItemComponent>componentRef.instance).data = { levename: this.data.childrenCount.toString(), childrenCount: 0,labelType:'node'}
    // }
    // else {
    //   this.data.childrenCount++
    //   (<MindLabelItemComponent>componentRef.instance).data = { levename: this.data.levename + '.' + this.data.childrenCount.toString(), childrenCount: 0,labelType:'node'  }
    // }

    // (<MindLabelItemComponent>componentRef.instance).closeObservable().subscribe(this.deleteChildObserver) //订阅删除

    // sysMethod.IsNeedReflash = true
    this.addChildComponent()
  }


  public addChildComponent():MindLabelItemComponent{
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(MindLabelItemComponent);

    let viewContainerRef = this.appLabel.viewContainerRef;

    let componentRef = viewContainerRef.createComponent(componentFactory);

    this.childrenComponentRefs.push(componentRef)

    if (this.data.levename == "root") {
      this.data.childrenCount++
      (<MindLabelItemComponent>componentRef.instance).data = { levename: this.data.childrenCount.toString(), childrenCount: 0,labelType:'node',memoValue: "" }
    }
    else {
      this.data.childrenCount++
      (<MindLabelItemComponent>componentRef.instance).data = { levename: this.data.levename + '.' + this.data.childrenCount.toString(), childrenCount: 0,labelType:'node' ,memoValue: "" }
    }

    (<MindLabelItemComponent>componentRef.instance).closeObservable().subscribe(this.deleteChildObserver) //订阅删除

    sysMethod.IsNeedReflash = true
    return (<MindLabelItemComponent>componentRef.instance)
  }

  //作为父组件 清除所有子组件
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

    this.childrenComponentRefs = []
  }

  //作为子组件 删除自己
  closeComponent(){
    this.closeSubject.next(this.data.levename);//向父组件发送删除自己消息
  }


  public setMemo(memo:string){
    this.data.memoValue = memo
  }

  memoValueChange(e){
    sysMethod.IsNeedReflash = true
  }



}
