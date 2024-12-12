import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TipoEquipamento } from '../../model/tipoEquipamento';


@Component({
  selector: 'app-tipoEquipamento-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './tipoEquipamento-list.component.html',
  styleUrl: './tipoEquipamento-list.component.scss'
})
export class TipoEquipamentoListComponent {

  @Input() tipoEquipamento: TipoEquipamento[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);


  readonly displayedColumns = ['nomeTipoEquipamento', 'descricaoTipoEquipamento', 'actions']

  constructor(
  ) {}


  onAdd() {
    this.add.emit(true);
  }

  onEdit(tipoEquipamento: TipoEquipamento) {
    this.edit.emit(tipoEquipamento);
  }

  onDelete(tipoEquipamento: TipoEquipamento) {
    this.remove.emit(tipoEquipamento);
  }
}
