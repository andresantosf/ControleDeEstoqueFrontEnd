import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StatusEquipamento } from '../model/statusEquipamento';
import { Observable, of } from 'rxjs';
import { StatusEquipamentoService } from '../services/statusEquipamento.service';

@Injectable({
  providedIn: 'root'
})
export class StatusEquipamentoResolver {

  constructor(private service: StatusEquipamentoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StatusEquipamento> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({ idstatusequipamento: '', nomeStatusEquipamento: '', descricaoStatusEquipamento: ''});
  }
}
