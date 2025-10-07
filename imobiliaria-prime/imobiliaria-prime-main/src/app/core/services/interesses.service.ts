import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteresseService {
  private apiUrl = 'http://localhost:3000/interesses';

  constructor(private http: HttpClient) {}

  registrarInteresse(clienteId: number, imovelId: number): Observable<any> {
    return this.http.post(this.apiUrl, { clienteId, imovelId });
  }

  getInteressesPorCliente(clienteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?clienteId=${clienteId}`);
  }

  removerInteressePorImovel(clienteId: number, imovelId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?clienteId=${clienteId}&imovelId=${imovelId}`);
  }

  deletarInteressePorId(interesseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${interesseId}`);
  }
}