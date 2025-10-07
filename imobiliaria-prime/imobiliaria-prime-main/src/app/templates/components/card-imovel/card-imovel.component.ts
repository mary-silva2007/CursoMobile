import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'; // 👈 IMPORTANTE
import { AuthService } from 'src/app/core/services/auth.service';
import { InteresseService } from 'src/app/core/services/interesses.service';
@Component({
  selector: 'app-card-imovel',
  templateUrl: './card-imovel.component.html',
  styleUrls: ['./card-imovel.component.scss']
})
export class CardImovelComponent implements OnInit {
  @Input() imovel: any = {
    id: 0,
    titulo: '',
    tipo: '',
    cidade: '',
    preco: 0,
    descricao: '',
    imagemUrl: 'https://via.placeholder.com/300x200?text=Sem+Imagem'
  };

  @Input() modoGerenciamento: boolean = false;

  @Output() aoRemoverInteresse = new EventEmitter<number>();
  // 👇 Removido aoVerDetalhes (não é mais necessário)

  deveMostrarBotaoInteresse: boolean = false;
  jaTemInteresse: boolean = false;
  carregandoInteresse: boolean = false;
imoveis: any;

  constructor(
    private authService: AuthService,
    private interesseService: InteresseService,
    private router: Router // 👈 INJETADO
  ) {}

  ngOnInit(): void {
    if (this.modoGerenciamento) {
      this.deveMostrarBotaoInteresse = this.authService.getPerfilUsuario() === 'cliente';
    } else {
      this.verificarPermissaoInteresse();
    }
  }

  private verificarPermissaoInteresse(): void {
    if (!this.authService.isAuthenticated()) {
      this.deveMostrarBotaoInteresse = false;
      return;
    }

    const perfil = this.authService.getPerfilUsuario();
    if (perfil !== 'cliente') {
      this.deveMostrarBotaoInteresse = false;
      return;
    }

    this.deveMostrarBotaoInteresse = true;
    this.verificarInteresseExistente();
  }

  private verificarInteresseExistente(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const clienteId = Number(usuario.id);

    this.interesseService.getInteressesPorCliente(clienteId).subscribe({
      next: (interesses) => {
        this.jaTemInteresse = interesses.some(item => item.imovelId === this.imovel.id);
      },
      error: (err) => {
        console.error('Erro ao verificar interesse:', err);
      }
    });
  }

  alternarInteresse(): void {
    if (this.jaTemInteresse || this.modoGerenciamento) return;

    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const clienteId = Number(usuario.id);

    this.carregandoInteresse = true;

    this.interesseService.registrarInteresse(clienteId, this.imovel.id).subscribe({
      next: () => {
        this.jaTemInteresse = true;
        this.carregandoInteresse = false;
      },
      error: (err) => {
        console.error('Erro ao registrar interesse:', err);
        this.carregandoInteresse = false;
        alert('Não foi possível registrar seu interesse.');
      }
    });
  }

  removerInteresse(): void {
    if (this.modoGerenciamento) {
      this.aoRemoverInteresse.emit(this.imovel.id);
    }
  }

  // 👇 MÉTODO CORRIGIDO: NAVEGA PARA DETALHES
  verDetalhes(): void {
    this.router.navigate(['/imovel', this.imovel.id]);
  }
}