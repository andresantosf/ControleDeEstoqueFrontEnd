import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Equipamento } from '../model/equipamento';
import { Observable, of } from 'rxjs';
import { EquipamentoService } from '../services/equipamento.service';

@Injectable({
  providedIn: 'root'
})
export class EquipamentoResolver {

  constructor(private service: EquipamentoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Equipamento> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({ id: '', nomeEquipamento: '', descricaoEquipamento: ''});
  }
}
