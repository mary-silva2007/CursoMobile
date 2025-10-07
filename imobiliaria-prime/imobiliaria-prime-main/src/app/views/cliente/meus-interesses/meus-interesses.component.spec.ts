import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusInteressesComponent } from './meus-interesses.component';

describe('MeusInteressesComponent', () => {
  let component: MeusInteressesComponent;
  let fixture: ComponentFixture<MeusInteressesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeusInteressesComponent]
    });
    fixture = TestBed.createComponent(MeusInteressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
