import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsobusChoixroleComponent } from './isobus-choixrole.component';

describe('IsobusChoixroleComponent', () => {
  let component: IsobusChoixroleComponent;
  let fixture: ComponentFixture<IsobusChoixroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsobusChoixroleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsobusChoixroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
