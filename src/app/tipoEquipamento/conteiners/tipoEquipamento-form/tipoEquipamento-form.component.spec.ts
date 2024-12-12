import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEquipamentoFormComponent } from './tipoEquipamento-form.component';

describe('TipoEquipamentoFormComponent', () => {
  let component: TipoEquipamentoFormComponent;
  let fixture: ComponentFixture<TipoEquipamentoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoEquipamentoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoEquipamentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
