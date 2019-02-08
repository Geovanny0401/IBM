import { Injectable } from '@angular/core';
import { Cliente } from '../_model/cliente';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  clienteCambio = new Subject<Cliente[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${HOST}/clientes`;
  constructor(private http: HttpClient) { }

  listar()
  {
    return this.http.get<Cliente[]>(this.url);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<Cliente[]>(`${this.url}/pageable?page=${p}&size=${s}`);
 }
 
   listarPersonaPorId(id: number){
        return this.http.get<Cliente>(`${this.url}/${id}`);
   }
 
   registrar(cliente: Cliente){
      return this.http.post(this.url, cliente);
   }
 
   modificar(cliente: Cliente){
     return this.http.put(this.url, cliente);
  }
 
  eliminar(id: number){
     return this.http.delete(`${this.url}/${id}`);
  }
}
