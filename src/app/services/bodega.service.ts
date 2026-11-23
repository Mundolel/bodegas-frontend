import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bodega, BodegaRequest } from '../models/bodega.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BodegaService {
  private readonly http = inject(HttpClient);
  private readonly api = `${environment.apiUrl}/bodegas`;

  listar(): Observable<Bodega[]> {
    return this.http.get<Bodega[]>(this.api);
  }

  registrar(request: BodegaRequest): Observable<Bodega> {
    return this.http.post<Bodega>(this.api, request);
  }
}
