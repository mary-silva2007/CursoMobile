import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardImoveisComponent } from './dashboard-imoveis.component';

describe('DashboardImoveisComponent', () => {
  let component: DashboardImoveisComponent;
  let fixture: ComponentFixture<DashboardImoveisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardImoveisComponent]
    });
    fixture = TestBed.createComponent(DashboardImoveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
