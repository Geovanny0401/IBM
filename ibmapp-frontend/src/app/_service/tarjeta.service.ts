import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Tarjeta } from '../_model/tarjeta';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  tarjetaCambio = new Subject<Tarjeta[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${HOST}/tarjetas`;
  constructor(private http: HttpClient) { }

  listar()
  {
    return this.http.get<Tarjeta[]>(this.url);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<Tarjeta[]>(`${this.url}/pageable?page=${p}&size=${s}`);
 }
 
   listarTarjetaPorId(id: number){
        return this.http.get<Tarjeta>(`${this.url}/${id}`);
   }
 
   registrar(tarjeta: Tarjeta){
      return this.http.post(this.url, tarjeta);
   }
 
   modificar(tarjeta: Tarjeta){
     return this.http.put(this.url, tarjeta);
  }
 
  eliminar(id: number){
     return this.http.delete(`${this.url}/${id}`);
  }

}
