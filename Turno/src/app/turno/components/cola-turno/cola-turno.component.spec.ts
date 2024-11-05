import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaTurnoComponent } from './cola-turno.component';

describe('ColaTurnoComponent', () => {
  let component: ColaTurnoComponent;
  let fixture: ComponentFixture<ColaTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColaTurnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColaTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
