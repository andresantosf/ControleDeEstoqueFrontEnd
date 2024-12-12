import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { StatusEquipamentoResolver } from './statusEquipamento.resolver';

describe('statusEquipamentoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => StatusEquipamentoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
