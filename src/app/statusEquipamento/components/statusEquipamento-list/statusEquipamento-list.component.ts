import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { StatusEquipamento } from '../../model/statusEquipamento';


@Component({
  selector: 'app-statusEquipamento-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './statusEquipamento-list.component.html',
  styleUrl: './statusEquipamento-list.component.scss'
})
export class StatusEquipamentoListComponent {

  @Input() statusEquipamento: StatusEquipamento[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);


  readonly displayedColumns = ['nomeStatusEquipamento', 'descricaoStatusEquipamento', 'actions']

  constructor(
  ) {}


  onAdd() {
    this.add.emit(true);
  }

  onEdit(statusEquipamento: StatusEquipamento) {
    this.edit.emit(statusEquipamento);
  }

  onDelete(statusEquipamento: StatusEquipamento) {
    this.remove.emit(statusEquipamento);
  }
}
