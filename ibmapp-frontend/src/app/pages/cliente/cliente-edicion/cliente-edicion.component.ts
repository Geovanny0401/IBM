import { Component, OnInit } from '@angular/core';
import { Cliente } from './../../../_model/cliente';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ClienteService } from './../../../_service/cliente.service';

@Component({
  selector: 'app-cliente-edicion',
  templateUrl: './cliente-edicion.component.html',
  styleUrls: ['./cliente-edicion.component.css']
})
export class ClienteEdicionComponent implements OnInit {

  id: number;
  form: FormGroup;
  edicion: boolean = false;
  cliente: Cliente;
  constructor(private route: ActivatedRoute, private router: Router, private clienteService: ClienteService) { }

  ngOnInit() {

    this.form = new FormGroup({
      'id' : new FormControl(0),
      'nombre' : new FormControl(''),
      'ciudad' : new FormControl(''),
      'direccion' : new FormControl(''),
      'telefono' : new FormControl('')
     });
 
     this.cliente = new Cliente();
 
     this.route.params.subscribe((params: Params) => {
          this.id = params['id'];
          this.edicion = this.id != null;
 
          this.initForm();
     });
  }

  initForm(){
    if(this.edicion){
      //cargar la data del servicio hacia el form 
      this.clienteService.listarPersonaPorId(this.id).subscribe(data => {
           this.form = new FormGroup({
            'id': new FormControl(data.idCliente),
            'nombre': new FormControl(data.nombre),
            'ciudad': new FormControl(data.ciudad),
            'direccion': new FormControl(data.direccion),
            'telefono': new FormControl(data.telefono)
           });
      });
    }
  }
  
  operar(){
    this.cliente.idCliente = this.form.value['id'];
    this.cliente.nombre = this.form.value['nombre'];
    this.cliente.ciudad = this.form.value['ciudad'];
    this.cliente.direccion = this.form.value['direccion'];
    this.cliente.telefono=this.form.value['telefono'];
    if(this.edicion)
    {
      //actualizar
      this.clienteService.modificar(this.cliente).subscribe(data =>{
              this.clienteService.listar().subscribe(clientes =>{
                this.clienteService.clienteCambio.next(clientes);
                this.clienteService.mensajeCambio.next('Registro Actualizado');
                });
        });
    }else{
      //registrar
      this.clienteService.registrar(this.cliente).subscribe(data => {
        this.clienteService.listar().subscribe(clientes =>{
          this.clienteService.clienteCambio.next(clientes);
          this.clienteService.mensajeCambio.next('Registro Exitoso');
        });
      });
    }
    this.router.navigate(['cliente']);
  }

}
