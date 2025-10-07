// src/app/models/imovel.model.ts
export interface Imovel {
  id?: number;
  titulo: string;
  tipo: string;
  cidade: string;
  preco: number;
  descricao: string;
  imagemUrl: string;
  corretorId: number;
}