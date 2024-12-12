import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEquipamentoListComponent } from './tipoEquipamento-list.component';

describe('TipoEquipamentoListComponent', () => {
  let component: TipoEquipamentoListComponent;
  let fixture: ComponentFixture<TipoEquipamentoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoEquipamentoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoEquipamentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
