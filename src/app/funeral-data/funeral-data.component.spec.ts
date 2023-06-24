import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuneralDataComponent } from './funeral-data.component';

describe('FuneralDataComponent', () => {
  let component: FuneralDataComponent;
  let fixture: ComponentFixture<FuneralDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuneralDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuneralDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
