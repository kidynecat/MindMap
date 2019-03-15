import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MindCanvasComponent } from './mind-canvas.component';

describe('MindCanvasComponent', () => {
  let component: MindCanvasComponent;
  let fixture: ComponentFixture<MindCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MindCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MindCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
