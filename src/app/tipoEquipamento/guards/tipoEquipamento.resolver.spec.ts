import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { TipoEquipamentoResolver } from './tipoEquipamento.resolver';

describe('tipoEquipamentoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => TipoEquipamentoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
