import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusEquipamentoFormComponent } from './statusEquipamento-form.component';

describe('StatusEquipamentoFormComponent', () => {
  let component: StatusEquipamentoFormComponent;
  let fixture: ComponentFixture<StatusEquipamentoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusEquipamentoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusEquipamentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
