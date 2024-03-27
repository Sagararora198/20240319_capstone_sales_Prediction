import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictonsComponent } from './predictons.component';

describe('PredictonsComponent', () => {
  let component: PredictonsComponent;
  let fixture: ComponentFixture<PredictonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PredictonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PredictonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
