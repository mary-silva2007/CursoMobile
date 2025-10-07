import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImoveisService } from 'src/app/core/services/imoveis.service';

@Component({
  selector: 'app-detalhes-imovel',
  templateUrl: './detalhes-imovel.component.html',
  styleUrls: ['./detalhes-imovel.component.scss']
})
export class DetalhesImovelComponent implements OnInit {
  imovel: any = null;
  erro: string | null = null;
  carregando: boolean = true; // ✅ Adicionado

  constructor(
    private route: ActivatedRoute,
    private imoveisService: ImoveisService,
    private router: Router // ✅ Injetar Router para navegação
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      const id = Number(idParam);
      if (isNaN(id)) {
        this.erro = 'ID inválido.';
        this.carregando = false; // ✅ Para exibir a mensagem de erro
        return;
      }
      this.carregarImovel(id);
    } else {
      this.erro = 'ID não encontrado.';
      this.carregando = false; // ✅
    }
  }

  carregarImovel(id: number): void {
    this.carregando = true; // ✅ Começa carregando
    this.imoveisService.getImovel(id).subscribe({
      next: (data) => {
        this.imovel = data;
        this.carregando = false; // ✅ Carregamento concluído
      },
      error: (err) => {
        console.error('Erro ao carregar imóvel:', err);
        this.erro = 'Erro ao carregar imóvel.';
        this.carregando = false; // ✅ Para parar o spinner
      }
    });
  }

  // ✅ Método para voltar à página anterior
  voltar(): void {
    this.router.navigate(['/cliente/imoveis']); // ou use this.router.navigateByUrl('/cliente/imoveis');
    // Alternativa: window.history.back();
  }
}