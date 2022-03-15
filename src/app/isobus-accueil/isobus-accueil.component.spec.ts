import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsobusAccueilComponent } from './isobus-accueil.component';

describe('IsobusAccueilComponent', () => {
  let component: IsobusAccueilComponent;
  let fixture: ComponentFixture<IsobusAccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsobusAccueilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsobusAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
