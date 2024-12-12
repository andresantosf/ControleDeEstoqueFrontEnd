import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tipoEquipamento' },
  {
    path: 'tipoEquipamento',
    loadChildren: () => import('./tipoEquipamento/tipoEquipamento.routes').then(m => m.COURSES_ROUTES)
  },
  {
    path: 'equipamento',
    loadChildren: () => import('./equipamento/equipamento.routes').then(m => m.COURSES_ROUTES)
  }
];
