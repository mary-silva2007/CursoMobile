import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImoveisService {
  private apiUrl = 'http://localhost:3000/imoveis'; // JSON Server

  constructor(private http: HttpClient) {}

  getImoveis(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getImovel(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createImovel(imovel: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      ...imovel,
      id: Number(imovel.id) || undefined, // Remove o ID se for novo
      corretorId: Number(imovel.corretorId),
    });
  } 

  updateImovel(id: number, imovel: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, imovel);
  }

  deleteImovel(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
