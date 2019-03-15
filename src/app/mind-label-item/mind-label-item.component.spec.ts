import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MindLabelItemComponent } from './mind-label-item.component';

describe('MindLabelItemComponent', () => {
  let component: MindLabelItemComponent;
  let fixture: ComponentFixture<MindLabelItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MindLabelItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MindLabelItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
