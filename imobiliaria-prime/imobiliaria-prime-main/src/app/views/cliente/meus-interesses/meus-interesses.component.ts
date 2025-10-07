import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { InteresseService } from 'src/app/core/services/interesses.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-meus-interesses',
  templateUrl: './meus-interesses.component.html',
  styleUrls: ['./meus-interesses.component.scss'],
})
export class MeusInteressesComponent implements OnInit {
  imoveisInteresse: any[] = [];
  carregando: boolean = true;
  erro: string | null = null;

  constructor(
    private authService: AuthService,
    private interesseService: InteresseService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.carregarMeusInteresses();
  }

  private carregarMeusInteresses(): void {
    if (!this.authService.isAuthenticated()) {
      this.erro = 'Você precisa estar logado para ver seus interesses.';
      this.carregando = false;
      return;
    }

    const perfil = this.authService.getPerfilUsuario();
    if (perfil !== 'cliente') {
      this.erro = 'Apenas clientes podem acessar esta página.';
      this.carregando = false;
      return;
    }

    const usuarioLogado = JSON.parse(localStorage.getItem('usuario') || '{}');
    const clienteId = Number(usuarioLogado.id);

    this.interesseService.getInteressesPorCliente(clienteId).subscribe({
      next: (interesses) => {
        if (interesses.length === 0) {
          this.imoveisInteresse = [];
          this.carregando = false;
          return;
        }

        const imovelIds = interesses.map((item: any) => item.imovelId);
        this.http.get<any[]>('http://localhost:3000/imoveis').subscribe({
          next: (todosImoveis) => {
            this.imoveisInteresse = todosImoveis.filter((imovel) =>
              imovelIds.includes(imovel.id)
            );
            this.carregando = false;
          },
          error: () => {
            this.erro = 'Erro ao carregar imóveis.';
            this.carregando = false;
          },
        });
      },
      error: () => {
        this.erro = 'Erro ao carregar interesses.';
        this.carregando = false;
      },
    });
  }

  trackByImovel(index: number, imovel: any): number {
    return imovel.id;
  }

  removerInteresse(imovelId: number): void {
    if (!confirm('Deseja remover este imóvel da sua lista de interesses?'))
      return;

    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const clienteId = Number(usuario.id);

    this.interesseService
      .removerInteressePorImovel(clienteId, imovelId)
      .subscribe({
        next: (interesses: any[]) => {
          if (interesses.length > 0) {
            const interesseId = interesses[0].id;
            this.interesseService.deletarInteressePorId(interesseId).subscribe({
              next: () => {
                this.imoveisInteresse = this.imoveisInteresse.filter(
                  (im) => im.id !== imovelId
                );

                // 👇 Notifica cards na mesma aba
                localStorage.setItem(
                  'interesse_atualizado',
                  Date.now().toString()
                );
              },
              error: (err) => {
                console.error('Erro ao deletar interesse:', err);
                alert('Erro ao remover interesse.');
              },
            });
          }
        },
        error: (err) => {
          console.error('Erro ao buscar interesse:', err);
          alert('Erro ao remover interesse.');
        },
      });
  }
}
