import { Component, OnInit } from '@angular/core';
import { ImoveisService } from 'src/app/core/services/imoveis.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard-imoveis',
  templateUrl: './dashboard-imoveis.component.html',
  styleUrls: ['./dashboard-imoveis.component.scss']
  // NÃO adicione: standalone: true
  // NÃO adicione: imports: [FormsModule]
})
export class DashboardImoveisComponent implements OnInit {
  imoveis: any[] = [];
  carregando: boolean = true;
  erro: string | null = null;
  exibindoForm: boolean = false;
  imovelEditando: any = null;
  corretorId!: number;

  constructor(
    private imoveisService: ImoveisService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.corretorId = Number(usuario.id);
    this.carregarImoveis();
  }

  carregarImoveis(): void {
  this.imoveisService.getImoveis().subscribe({
    next: (data) => {
      console.log('Dados recebidos do backend:', data);

      const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
      const corretorId = Number(usuario.id);

      console.log('Corretor ID logado (convertido para número):', corretorId);

      const imoveisFiltrados = data
        .map(imovel => ({
          ...imovel,
          id: Number(imovel.id),
          corretorId: Number(imovel.corretorId)
        }))
        .filter((imovel: any) => {
          console.log(`Comparando: imovel.corretorId (${imovel.corretorId}) === corretorId (${corretorId})`);
          return imovel.corretorId === corretorId;
        });

      console.log('Imóveis filtrados:', imoveisFiltrados);

      this.imoveis = imoveisFiltrados;
      this.carregando = false;
    },
    error: (err) => {
      console.error('Erro ao carregar imóveis:', err);
      this.erro = 'Erro ao carregar imóveis.';
      this.carregando = false;
    }
  });
}

  novoImovel(): void {
    this.imovelEditando = {
      titulo: '',
      tipo: '',
      cidade: '',
      preco: 0,
      descricao: '',
      imagemUrl: '',
      corretorId: this.corretorId
    };
    this.exibindoForm = true;
  }

  editarImovel(imovel: any): void {
    this.imovelEditando = { ...imovel };
    this.exibindoForm = true;
  }

  salvarImovel(): void {
    if (this.imovelEditando.id) {
      this.imoveisService.updateImovel(this.imovelEditando.id, this.imovelEditando).subscribe({
        next: () => this.voltarParaLista(),
        error: () => alert('Erro ao atualizar imóvel.')
      });
    } else {
      this.imoveisService.createImovel(this.imovelEditando).subscribe({
        next: () => this.voltarParaLista(),
        error: () => alert('Erro ao salvar imóvel.')
      });
    }
  }

  deletarImovel(id: number): void {
    if (confirm('Tem certeza que deseja excluir este imóvel?')) {
      this.imoveisService.deleteImovel(id).subscribe({
        next: () => this.carregarImoveis(),
        error: () => alert('Erro ao excluir imóvel.')
      });
    }
  }

  voltarParaLista(): void {
    this.exibindoForm = false;
    this.imovelEditando = null;
    this.carregarImoveis();
  }

  cancelarForm(): void {
    this.voltarParaLista();
  }
}