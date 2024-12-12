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
import { EquipamentoListComponent } from '../../components/equipamento-list/equipamento-list.component';
import { Equipamento } from '../../model/equipamento';
import { EquipamentoPage } from '../../model/equipamento-page';
import { EquipamentoService } from '../../services/equipamento.service';


@Component({
  selector: 'app-equipamento',
  templateUrl: './equipamento.component.html',
  styleUrls: ['./equipamento.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatToolbarModule, EquipamentoListComponent, MatPaginatorModule, MatProgressSpinnerModule, AsyncPipe],
})

export class EquipamentoComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator
  pageIndex = 0;
  pageSize = 10;

  equipamento$: Observable<EquipamentoPage> | null = null;

  constructor(
    private equipamentoService: EquipamentoService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {

    this.refresh();

  }

  refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }) {
    this.equipamento$ = this.equipamentoService.list(pageEvent.pageIndex, pageEvent.pageSize)
      .pipe(
        tap(() => {
          this.pageIndex = pageEvent.pageIndex;
          this.pageSize = pageEvent.pageSize;
        }),
        catchError(error => {
          this.onError('Erro ao carregar Equipamento.');
          return of({ equipamento: [], totalElements: 0, totalPages: 0 })
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

  onEdit(equipamento: Equipamento) {
    this.router.navigate(['edit', equipamento.id], { relativeTo: this.route })
  }
  onRemove(equipamento: Equipamento) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover este Equipamento?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.equipamentoService.remove(equipamento.id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Equipamento removido com sucesso', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          error => this.onError('Erro ao tentar remover Equipamento')
        );
      }
    });

  }


}
