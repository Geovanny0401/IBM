import { Component, OnInit } from '@angular/core';
import { Tarjeta } from './../../../_model/tarjeta';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Cliente } from './../../../_model/cliente';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TarjetaService } from './../../../_service/tarjeta.service';
import { map } from 'rxjs/operators';
import { ClienteService } from './../../../_service/cliente.service';
import { MatSnackBar } from '@angular/material';
import { DetalleConsumo } from './../../../_model/detalleConsumo';


@Component({
  selector: 'app-tarjeta-edicion',
  templateUrl: './tarjeta-edicion.component.html',
  styleUrls: ['./tarjeta-edicion.component.css']
})
export class TarjetaEdicionComponent implements OnInit {

  [x: string]: any;

  id: number;
  form: FormGroup;
  edicion: boolean = false;
  tarjeta: Tarjeta;

  clientes: Cliente[] = [];
  detalleConsumo: DetalleConsumo[] = [];
  
  descripcion: string;
  fecha: string;
  monto: number;

  fechaSeleccionada: Date = new Date();

  myControlCliente: FormControl = new FormControl();

  mensaje: string;

  filteredOptions: Observable<any[]>;
  clienteSeleccionado: Cliente;

  constructor(private builder: FormBuilder, private route: ActivatedRoute, private router: Router, private clienteService: ClienteService, private tarjetaService: TarjetaService, public snackBar: MatSnackBar) { }

  ngOnInit() {

   this.form = this.builder.group({
    'id': new FormControl(0),
    'numtarjeta': new FormControl(''),
    'tiptarjeta': new FormControl(''),
    'ccv': new FormControl(''),
    'fecha': new FormControl(new Date()),
    'descripcion': new FormControl(''),
    'monto': new FormControl(''),
    'cliente': this.myControlCliente
  });
    this.listarClientes();
    this.filteredOptions = this.myControlCliente.valueChanges.pipe(map(val => this.filter(val)));

    
    this.tarjeta = new Tarjeta();

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;

      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      //cargar la data del servicio hacia el form  
      this.tarjetaService.listarTarjetaPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idTarjeta),
          'numtarjeta': new FormControl(data.numtarjeta),
          'tiptarjeta': new FormControl(data.tiptarjeta),
          'ccv': new FormControl(data.ccv),
          'cliente': new FormControl(data.cliente),
           });
      });
    }
  }
/*
  operar() {
    this.tarjeta.idTarjeta = this.form.value['id'];
    //this.signo.fecha = this.form.value['fecha'];
    this.tarjeta.numtarjeta = this.form.value['numtarjeta'];
    this.tarjeta.tiptarjeta = this.form.value['tiptarjeta'];
    this.tarjeta.ccv = this.form.value['ccv'];
    this.tarjeta.cliente = this.form.value['cliente'];
    this.tarjeta.detalleConsumo = this.form.value['fecha'];
    this.tarjeta.detalleConsumo = this.form.value['descripcion'];
    this.tarjeta.detalleConsumo = this.form.value['monto']
    if (this.edicion) {
      //actualizar
      this.tarjetaService.modificar(this.signo).subscribe(data => {
        this.tarjetaService.listar().subscribe(tarjetas => {
          this.tarjetaService.tarjetaCambio.next(tarjetas);
          this.tarjetaService.mensajeCambio.next('Registro Actualizado');
        });
      });
    } else {
      //registrar
      this.tarjetaService.registrar(this.tarjeta).subscribe(data => {
        this.tarjetaService.listar().subscribe(tarjetas => {
          this.tarjetaService.tarjetaCambio.next(tarjetas);
          this.tarjetaService.mensajeCambio.next('Registro Ingresado');
        });
      });
    }

    this.router.navigate(['tarjeta']);
  }
*/

operar() {
  this.tarjeta = new Tarjeta();
this.tarjeta.cliente = this.form.value['cliente'];
this.tarjeta.ccv = this.form.value['ccv'];
this.tarjeta.numtarjeta = this.form.value['numtarjeta'];
this.tarjeta.tiptarjeta = this.form.value['tiptarjeta'];
this.tarjeta.detalleConsumo = this.detalleConsumo;

if (this.edicion) {
  //actualizar
  this.tarjetaService.modificar(this.tarjeta).subscribe(data => {
    this.tarjetaService.listar().subscribe(tarjetas => {
      this.tarjetaService.tarjetaCambio.next(tarjetas);
      this.tarjetaService.mensajeCambio.next('Registro Actualizado');
    });
  });
} else {
  //registrar
  this.tarjetaService.registrar(this.tarjeta).subscribe(data => {
    this.tarjetaService.listar().subscribe(tarjetas => {
      this.tarjetaService.tarjetaCambio.next(tarjetas);
      this.tarjetaService.mensajeCambio.next('Registro Ingresado');
    });
  });
}

this.router.navigate(['tarjeta']);
}

  filter(val: any) {
    if (val != null && val.idCliente > 0) {
      return this.clientes.filter(option =>
        option.nombre.toLowerCase().includes(val.nombre.toLowerCase()));
    } else {
      return this.clientes.filter(option =>
        option.nombre.toLowerCase().includes(val.toLowerCase()));
    }
  }
  displayFn(val: Cliente) {
    return val ? `${val.nombre}` : val;
  }

  listarClientes() {
    this.clienteService.listar().subscribe(data => {
      this.clientes = data;
    });
  }

  seleccionarCliente(e: any){
    //console.log(e);
    this.clienteSeleccionado = e.option.value;
  }

  agregar() {

    if (this.descripcion != null && this.monto != null) {
      let det = new DetalleConsumo();
      det.descripcion = this.descripcion;
      det.monto = this.monto;
      det.fecha= this.fecha;
      this.detalleConsumo.push(det);
      this.descripcion = null;
      this.monto = null;
      this.fecha=null;
    } else {
      this.mensaje = `Debe agregar una Descricpcion y fecha del consumo`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }

  removerConsumo(index: number) {
    this.detalleConsumo.splice(index, 1);
  }

  public validateSSN(ssnInput, snackbar) {
    if (!this.isSSNValid(ssnInput.value)) {
        this.notify(snackbar, "Invalid SSN", ssnInput);
    }
}

private isSSNValid(ssn) {
  const ssnPattern = /^[0-9]{4}\-?[0-9]{4}\-?[0-9]{4}\-?[0-9]{4}$/;
  return (ssn.match(ssnPattern));
}
}
