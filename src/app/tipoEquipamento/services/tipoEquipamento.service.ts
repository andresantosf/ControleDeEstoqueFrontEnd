import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { TipoEquipamento } from '../model/tipoEquipamento';
import { TipoEquipamentoPage } from '../model/tipoEquipamento-page';

@Injectable({
  providedIn: 'root'
})
export class TipoEquipamentoService {

  private readonly API = 'http://localhost:8080/api/tipoEquipamento';


  constructor(
    private httpClient: HttpClient,
    public dialog: MatDialog
  ) {}

  list(page = 0, pagesize = 10) {
    return this.httpClient.get<TipoEquipamentoPage>(this.API, {
      params: {
        page,
        pageSize: pagesize
      }

    })
      .pipe(
        first(),
      );
  }

  loadById(id: string) {
    return this.httpClient.get<TipoEquipamento>(`${this.API}/${id}`);
  }

  save(record: Partial<TipoEquipamento>) {
    if (record.id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<TipoEquipamento>) {
    delete record.id;
    return this.httpClient.post<TipoEquipamento>(this.API, record).pipe(first());
  }
  private update(record: Partial<TipoEquipamento>) {
    return this.httpClient.put<TipoEquipamento>(`${this.API}/${record.id}`, record).pipe(first());
  }
  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }

  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage
    });
  }
}
