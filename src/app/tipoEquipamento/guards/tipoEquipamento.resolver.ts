import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TipoEquipamento } from '../model/tipoEquipamento';
import { Observable, of } from 'rxjs';
import { TipoEquipamentoService } from '../services/tipoEquipamento.service';

@Injectable({
  providedIn: 'root'
})
export class TipoEquipamentoResolver {

  constructor(private service: TipoEquipamentoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TipoEquipamento> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({ id: '', nomeTipoEquipamento: '', descricaoTipoEquipamento: ''});
  }
}
