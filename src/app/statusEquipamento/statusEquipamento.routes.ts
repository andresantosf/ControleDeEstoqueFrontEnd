import { Routes } from '@angular/router';

import { StatusEquipamentoResolver } from './guards/statusEquipamento.resolver';
import { StatusEquipamentoComponent } from './conteiners/statusEquipamento/statusEquipamento.component';
import { StatusEquipamentoFormComponent } from './conteiners/statusEquipamento-form/statusEquipamento-form.component';
export const COURSES_ROUTES: Routes = [
  { path: '', component: StatusEquipamentoComponent },
  { path: 'new', component: StatusEquipamentoFormComponent, resolve: { statusEquipamento: StatusEquipamentoResolver } },
  { path: 'edit/:id', component: StatusEquipamentoFormComponent, resolve: { statusEquipamento: StatusEquipamentoResolver } }
];
