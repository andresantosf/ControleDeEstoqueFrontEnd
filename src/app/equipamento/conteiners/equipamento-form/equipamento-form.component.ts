import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, UntypedFormArray, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';

import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { Equipamento } from '../../model/equipamento';
import { EquipamentoService } from '../../services/equipamento.service';
import { StatusEquipamento } from '../../../statusEquipamento/model/statusEquipamento';
import { StatusEquipamentoService } from '../../../statusEquipamento/services/statusEquipamento.service';
import { TipoEquipamentoService } from '../../../tipoEquipamento/services/tipoEquipamento.service';
import { TipoEquipamento } from '../../../tipoEquipamento/model/tipoEquipamento';


@Component({
  selector: 'app-equipamento-form',
  standalone: true,
  imports: [MatCardModule,  CommonModule, MatToolbarModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule, MatIconModule], templateUrl: './equipamento-form.component.html',
  styleUrl: './equipamento-form.component.scss'
})
export class EquipamentoFormComponent {
  form!: FormGroup;

  statusEquipamentos: StatusEquipamento[] = [];
  selectedStatus: string = ''; 

  tipoEquipamentos: TipoEquipamento[] = [];
  selectedTipo: string = ''; 

  constructor(
    private tipoEquipamentoService: TipoEquipamentoService,
    private statusEquipamentoService: StatusEquipamentoService,
    private formBuilder: NonNullableFormBuilder,
    private service: EquipamentoService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
  ) {

    const equipamento: Equipamento = this.route.snapshot.data['equipamento'];

    this.form = this.formBuilder.group({
      id: [equipamento.id],
      nomeEquipamento: [equipamento.nomeEquipamento, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      descricaoEquipamento: [equipamento.descricaoEquipamento, [Validators.required]]
    });

  }

  onSubmit() {
    if (this.form.valid) {
      this.service.save(this.form.value).subscribe(result => this.onSuccess(),
        error => this.onError());
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }

  }

  onCancel() {
    this.location.back()
  }

  private onSuccess() {
    this.snackBar.open('Equipamento salvo com sucesso', '', {
      duration: 5000
    });
    this.onCancel();

  }
  private onError() {
    return this.snackBar.open('Erro ao salvar Equipamento', '', {
      duration: 5000
    });
  }

  ngOnInit(): void {
    this.getStatusEquipamentos();
    this.getTipoEquipamentos();
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

  getTipoEquipamentos(): void {
    this.tipoEquipamentoService.getTipoEquipamentos().subscribe(
      (data) => {
        this.tipoEquipamentos = data;
      },
      (error) => {
        console.error('Erro ao carregar os tipo de equipamentos', error);
      }
    );
  }


}
