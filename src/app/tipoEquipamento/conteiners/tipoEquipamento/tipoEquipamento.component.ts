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
import { TipoEquipamentoListComponent } from '../../components/tipoEquipamento-list/tipoEquipamento-list.component';
import { TipoEquipamento } from '../../model/tipoEquipamento';
import { TipoEquipamentoPage } from '../../model/tipoEquipamento-page';
import { TipoEquipamentoService } from '../../services/tipoEquipamento.service';


@Component({
  selector: 'app-tipoEquipamento',
  templateUrl: './tipoEquipamento.component.html',
  styleUrls: ['./tipoEquipamento.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatToolbarModule, TipoEquipamentoListComponent, MatPaginatorModule, MatProgressSpinnerModule, AsyncPipe],
})

export class TipoEquipamentoComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator
  pageIndex = 0;
  pageSize = 10;

  tipoEquipamento$: Observable<TipoEquipamentoPage> | null = null;

  constructor(
    private tipoEquipamentoService: TipoEquipamentoService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {

    this.refresh();

  }

  refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }) {
    this.tipoEquipamento$ = this.tipoEquipamentoService.list(pageEvent.pageIndex, pageEvent.pageSize)
      .pipe(
        tap(() => {
          this.pageIndex = pageEvent.pageIndex;
          this.pageSize = pageEvent.pageSize;
        }),
        catchError(error => {
          this.onError('Erro ao carregar Tipos de Equipamento.');
          return of({ tipoEquipamento: [], totalElements: 0, totalPages: 0 })
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

  onEdit(tipoEquipamento: TipoEquipamento) {
    this.router.navigate(['edit', tipoEquipamento.id], { relativeTo: this.route })
  }
  onRemove(tipoEquipamento: TipoEquipamento) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover este Tipo de Equipamento?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.tipoEquipamentoService.remove(tipoEquipamento.id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Tipo de Equipamento removido com sucesso', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          error => this.onError('Erro ao tentar remover Tipo de Equipamento')
        );
      }
    });

  }


}
