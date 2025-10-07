import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-form-imovel',
  templateUrl: './form-imovel.component.html',
  styleUrls: ['./form-imovel.component.scss']
})
export class FormImovelComponent implements OnInit {
  @Input() imovel: any = null;
  @Output() salvar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();

  form!: FormGroup;
  isEditando: boolean = false;
  tiposImovel = ['Apartamento', 'Casa', 'Terreno', 'Cobertura', 'Kitnet'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const corretorId = Number(usuario.id);

    this.isEditando = !!this.imovel;

    this.form = this.fb.group({
      id: [this.imovel?.id || null],
      titulo: [this.imovel?.titulo || '', Validators.required],
      tipo: [this.imovel?.tipo || '', Validators.required],
      cidade: [this.imovel?.cidade || '', Validators.required],
      preco: [this.imovel?.preco || '', [Validators.required, Validators.min(1)]],
      descricao: [this.imovel?.descricao || '', Validators.required],
      imagemUrl: [this.imovel?.imagemUrl || '', Validators.required],
      corretorId: [corretorId]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.salvar.emit(this.form.value);
    }
  }

  onCancelar(): void {
    this.cancelar.emit();
  }
}