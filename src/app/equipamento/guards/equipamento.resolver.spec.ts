import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { EquipamentoResolver } from './equipamento.resolver';

describe('equipamentoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => EquipamentoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
