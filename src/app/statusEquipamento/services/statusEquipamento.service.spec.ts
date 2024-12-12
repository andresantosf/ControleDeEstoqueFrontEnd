import { TestBed } from '@angular/core/testing';

import { StatusEquipamentoService } from './statusEquipamento.service';

describe('StatusEquipamentoService', () => {
  let service: StatusEquipamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusEquipamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
