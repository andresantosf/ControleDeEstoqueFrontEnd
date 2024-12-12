import { Routes } from '@angular/router';

import { EquipamentoResolver } from './guards/equipamento.resolver';
import { EquipamentoComponent } from './conteiners/equipamento/equipamento.component';
import { EquipamentoFormComponent } from './conteiners/equipamento-form/equipamento-form.component';
export const COURSES_ROUTES: Routes = [
  { path: '', component: EquipamentoComponent },
  { path: 'new', component: EquipamentoFormComponent, resolve: { equipamento: EquipamentoResolver } },
  { path: 'edit/:id', component: EquipamentoFormComponent, resolve: { equipamento: EquipamentoResolver } }
];
