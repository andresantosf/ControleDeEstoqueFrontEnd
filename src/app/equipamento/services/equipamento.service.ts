import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { Equipamento } from '../model/equipamento';
import { EquipamentoPage } from '../model/equipamento-page';

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {

  private readonly API = 'http://localhost:8080/api/equipamento';


  constructor(
    private httpClient: HttpClient,
    public dialog: MatDialog
  ) {}

  list(page = 0, pagesize = 10) {
    return this.httpClient.get<EquipamentoPage>(this.API, {
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
    return this.httpClient.get<Equipamento>(`${this.API}/${id}`);
  }

  save(record: Partial<Equipamento>) {
    if (record.id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Equipamento>) {
    delete record.id;
    return this.httpClient.post<Equipamento>(this.API, record).pipe(first());
  }
  private update(record: Partial<Equipamento>) {
    return this.httpClient.put<Equipamento>(`${this.API}/${record.id}`, record).pipe(first());
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
