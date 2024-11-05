import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaTurnosComponent } from './historia-turnos.component';

describe('HistoriaTurnosComponent', () => {
  let component: HistoriaTurnosComponent;
  let fixture: ComponentFixture<HistoriaTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriaTurnosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriaTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
