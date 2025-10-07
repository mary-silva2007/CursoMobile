import { Component, OnInit, TrackByFunction } from '@angular/core';
import { ImoveisService } from '../../../core/services/imoveis.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  imoveis: any[] = [];
  carregando = true;
  erroCarregar = false;
trackById: TrackByFunction<any> | undefined;

  constructor(
    private imoveisService: ImoveisService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carregarImoveis();
  }

  carregarImoveis() {
    this.imoveisService.getImoveis().subscribe({
      next: (data) => {
        this.imoveis = data;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar imóveis:', err);
        this.erroCarregar = true;
        this.carregando = false;
      },
    });
  }

  verDetalhes(id: number) {
    this.router.navigate(['/imovel', id]);
  }

  registrarInteresse(id: number) {
    console.log('Registrar interesse no imóvel ID:', id);
    alert(`Interesse registrado no imóvel ${id}`);
  }
}