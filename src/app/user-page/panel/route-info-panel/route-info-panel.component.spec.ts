import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteInfoPanelComponent } from './route-info-panel.component';

describe('RouteInfoPanelComponent', () => {
  let component: RouteInfoPanelComponent;
  let fixture: ComponentFixture<RouteInfoPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteInfoPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteInfoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
