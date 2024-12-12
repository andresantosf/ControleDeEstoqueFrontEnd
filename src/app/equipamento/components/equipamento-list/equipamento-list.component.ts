import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Equipamento } from '../../model/equipamento';


@Component({
  selector: 'app-equipamento-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './equipamento-list.component.html',
  styleUrl: './equipamento-list.component.scss'
})
export class EquipamentoListComponent {

  @Input() equipamento: Equipamento[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);


  readonly displayedColumns = ['nomeEquipamento', 'descricaoEquipamento', 'actions']

  constructor(
  ) {}


  onAdd() {
    this.add.emit(true);
  }

  onEdit(equipamento: Equipamento) {
    this.edit.emit(equipamento);
  }

  onDelete(equipamento: Equipamento) {
    this.remove.emit(equipamento);
  }
}
