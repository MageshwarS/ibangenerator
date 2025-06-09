import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IbanComponent } from './iban.component';

describe('IbanComponent', () => {
  let component: IbanComponent;
  let fixture: ComponentFixture<IbanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IbanComponent]
    });
    fixture = TestBed.createComponent(IbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
