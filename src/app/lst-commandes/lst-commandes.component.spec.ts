import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LstCommandesComponent } from './lst-commandes.component';

describe('LstCommandesComponent', () => {
  let component: LstCommandesComponent;
  let fixture: ComponentFixture<LstCommandesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LstCommandesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LstCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
