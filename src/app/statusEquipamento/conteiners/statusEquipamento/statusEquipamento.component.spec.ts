import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusEquipamentoComponent } from './statusEquipamento.component';

describe('StatusEquipamentoComponent', () => {
  let component: StatusEquipamentoComponent;
  let fixture: ComponentFixture<StatusEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusEquipamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
