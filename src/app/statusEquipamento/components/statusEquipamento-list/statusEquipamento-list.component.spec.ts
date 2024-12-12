import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusEquipamentoListComponent } from './statusEquipamento-list.component';

describe('StatusEquipamentoListComponent', () => {
  let component: StatusEquipamentoListComponent;
  let fixture: ComponentFixture<StatusEquipamentoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusEquipamentoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusEquipamentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
