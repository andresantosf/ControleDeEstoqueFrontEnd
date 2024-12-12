import { Location } from '@angular/common';
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
import { TipoEquipamento } from '../../model/tipoEquipamento';
import { TipoEquipamentoService } from '../../services/tipoEquipamento.service';


@Component({
  selector: 'app-tipoEquipamento-form',
  standalone: true,
  imports: [MatCardModule, MatToolbarModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule, MatIconModule], templateUrl: './tipoEquipamento-form.component.html',
  styleUrl: './tipoEquipamento-form.component.scss'
})
export class TipoEquipamentoFormComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: TipoEquipamentoService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
  ) {

    const tipoEquipamento: TipoEquipamento = this.route.snapshot.data['tipoEquipamento'];

    this.form = this.formBuilder.group({
      id: [tipoEquipamento.id],
      nomeTipoEquipamento: [tipoEquipamento.nomeTipoEquipamento, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      descricaoTipoEquipamento: [tipoEquipamento.descricaoTipoEquipamento, [Validators.required]]
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
    this.snackBar.open('Tipo de Equipamento salvo com sucesso', '', {
      duration: 5000
    });
    this.onCancel();

  }
  private onError() {
    return this.snackBar.open('Erro ao salvar Tipo de Equipamento', '', {
      duration: 5000
    });
  }

}
