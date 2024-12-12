import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';

import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { StatusEquipamentoListComponent } from '../../components/statusEquipamento-list/statusEquipamento-list.component';
import { StatusEquipamento } from '../../model/statusEquipamento';
import { StatusEquipamentoPage } from '../../model/statusEquipamento-page';
import { StatusEquipamentoService } from '../../services/statusEquipamento.service';


@Component({
  selector: 'app-statusEquipamento',
  templateUrl: './statusEquipamento.component.html',
  styleUrls: ['./statusEquipamento.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatToolbarModule, StatusEquipamentoListComponent, MatPaginatorModule, MatProgressSpinnerModule, AsyncPipe],
})

export class StatusEquipamentoComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator
  pageIndex = 0;
  pageSize = 10;

  statusEquipamento$: Observable<StatusEquipamentoPage> | null = null;

  constructor(
    private statusEquipamentoService: StatusEquipamentoService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {

    this.refresh();

  }

  refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }) {
    this.statusEquipamento$ = this.statusEquipamentoService.list(pageEvent.pageIndex, pageEvent.pageSize)
      .pipe(
        tap(() => {
          this.pageIndex = pageEvent.pageIndex;
          this.pageSize = pageEvent.pageSize;
        }),
        catchError(error => {
          this.onError('Erro ao carregar Status do Equipamento.');
          return of({ statusEquipamento: [], totalElements: 0, totalPages: 0 })
        })
      )
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    })
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  onEdit(statusEquipamento: StatusEquipamento) {
    this.router.navigate(['edit', statusEquipamento.idstatusequipamento], { relativeTo: this.route })
  }
  onRemove(statusEquipamento: StatusEquipamento) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover este Status do Equipamento?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.statusEquipamentoService.remove(statusEquipamento.idstatusequipamento).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Status do Equipamento removido com sucesso', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          error => this.onError('Erro ao tentar remover Status do Equipamento')
        );
      }
    });

  }


}
