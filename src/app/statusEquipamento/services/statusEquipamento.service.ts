import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first, Observable } from 'rxjs';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { StatusEquipamentoPage } from '../model/statusEquipamento-page';
import { StatusEquipamento } from '../model/statusEquipamento';

@Injectable({
  providedIn: 'root'
})
export class StatusEquipamentoService {

  private readonly API = 'http://localhost:8080/api/statusEquipamento';


  constructor(
    private httpClient: HttpClient,
    public dialog: MatDialog
  ) {}

  list(page = 0, pagesize = 10) {
    return this.httpClient.get<StatusEquipamentoPage>(this.API, {
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
    return this.httpClient.get<StatusEquipamento>(`${this.API}/${id}`);
  }

  save(record: Partial<StatusEquipamento>) {
    if (record.idstatusequipamento) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<StatusEquipamento>) {
    delete record.idstatusequipamento;
    return this.httpClient.post<StatusEquipamento>(this.API, record).pipe(first());
  }
  private update(record: Partial<StatusEquipamento>) {
    return this.httpClient.put<StatusEquipamento>(`${this.API}/${record.idstatusequipamento}`, record).pipe(first());
  }
  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }

  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage
    });
  }


  getStatusEquipamentos(): Observable<StatusEquipamento[]> {
    return this.httpClient.get<StatusEquipamento[]>(`${this.API}/list`);
  }

}
