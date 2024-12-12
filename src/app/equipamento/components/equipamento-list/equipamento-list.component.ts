import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Equipamento } from '../../model/equipamento';
import { StatusEquipamento } from '../../../statusEquipamento/model/statusEquipamento';
import { StatusEquipamentoService } from '../../../statusEquipamento/services/statusEquipamento.service';


@Component({
  selector: 'app-equipamento-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './equipamento-list.component.html',
  styleUrl: './equipamento-list.component.scss'
})
export class EquipamentoListComponent {

  statusEquipamentos: StatusEquipamento[] = [];
  selectedStatus: string = '';  
  
  @Input() equipamento: Equipamento[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);


  readonly displayedColumns = ['nomeEquipamento', 'descricaoEquipamento', 'actions']

  constructor(
      private statusEquipamentoService: StatusEquipamentoService,
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

  ngOnInit(): void {
    this.getStatusEquipamentos();
  }

  getStatusEquipamentos(): void {
    this.statusEquipamentoService.getStatusEquipamentos().subscribe(
      (data) => {
        this.statusEquipamentos = data;
      },
      (error) => {
        console.error('Erro ao carregar os status de equipamentos', error);
      }
    );
  }
}
