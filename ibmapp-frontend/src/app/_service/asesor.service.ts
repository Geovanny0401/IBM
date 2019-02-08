import { Injectable } from '@angular/core';
import { Asesor } from '../_model/asesor';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsesorService {

  asesorCambio = new Subject<Asesor[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${HOST}/asesores`;
  constructor(private http: HttpClient) { }

  listar()
  {
    return this.http.get<Asesor[]>(this.url);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<Asesor[]>(`${this.url}/pageable?page=${p}&size=${s}`);
 }
 
   listarPersonaPorId(id: number){
        return this.http.get<Asesor>(`${this.url}/${id}`);
   }
 
   registrar(asesor: Asesor){
      return this.http.post(this.url, asesor);
   }
 
   modificar(asesor: Asesor){
     return this.http.put(this.url, asesor);
  }
 
  eliminar(id: number){
     return this.http.delete(`${this.url}/${id}`);
  }
}
