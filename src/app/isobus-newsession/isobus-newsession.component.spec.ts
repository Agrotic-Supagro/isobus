import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsobusNewsessionComponent } from './isobus-newsession.component';

describe('IsobusNewsessionComponent', () => {
  let component: IsobusNewsessionComponent;
  let fixture: ComponentFixture<IsobusNewsessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsobusNewsessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsobusNewsessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
