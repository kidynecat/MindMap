import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { MindLabelItemComponent } from './mind-label-item/mind-label-item.component';
import { LabelDirectiveDirective } from './label-directive.directive';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { MindCanvasComponent } from './mind-canvas/mind-canvas.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MindLabelItemComponent,
    LabelDirectiveDirective,
    MindCanvasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  entryComponents: [ MindLabelItemComponent],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
