import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsobusJeuComponent } from './isobus-jeu.component';

describe('IsobusJeuComponent', () => {
  let component: IsobusJeuComponent;
  let fixture: ComponentFixture<IsobusJeuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsobusJeuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsobusJeuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
