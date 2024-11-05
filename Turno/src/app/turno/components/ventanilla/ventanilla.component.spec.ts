import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanillaComponent } from './ventanilla.component';

describe('VentanillaComponent', () => {
  let component: VentanillaComponent;
  let fixture: ComponentFixture<VentanillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentanillaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentanillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
