import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormImovelComponent } from './form-imovel.component';

describe('FormImovelComponent', () => {
  let component: FormImovelComponent;
  let fixture: ComponentFixture<FormImovelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormImovelComponent]
    });
    fixture = TestBed.createComponent(FormImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
