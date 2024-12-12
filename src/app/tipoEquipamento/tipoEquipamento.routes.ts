import { Routes } from '@angular/router';

import { TipoEquipamentoResolver } from './guards/tipoEquipamento.resolver';
import { TipoEquipamentoComponent } from './conteiners/tipoEquipamento/tipoEquipamento.component';
import { TipoEquipamentoFormComponent } from './conteiners/tipoEquipamento-form/tipoEquipamento-form.component';
export const COURSES_ROUTES: Routes = [
  { path: '', component: TipoEquipamentoComponent },
  { path: 'new', component: TipoEquipamentoFormComponent, resolve: { tipoEquipamento: TipoEquipamentoResolver } },
  { path: 'edit/:id', component: TipoEquipamentoFormComponent, resolve: { tipoEquipamento: TipoEquipamentoResolver } }
];
