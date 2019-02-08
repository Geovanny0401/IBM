import { Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatSort, MatSnackBar, MatPaginator } from '@angular/material';
import { Cliente } from './../../_model/cliente';
import { ClienteService } from './../../_service/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cantidad: number;
  dataSource: MatTableDataSource<Cliente>;
  displayedColumns = ['idCliente', 'nombres', 'ciudad', 'direccion', 'telefono', 'acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private clienteService: ClienteService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.clienteService.clienteCambio.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
    });
    this.clienteService.mensajeCambio.subscribe(data =>{
      this.snackBar.open(data, 'AVISO', {
           duration: 2000
      });
    });

    
    this.clienteService.listarPageable(0, 10).subscribe(data => {
      let clientes = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource = new MatTableDataSource(clientes);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     });
     
  }

  eliminar(idCliente: number){
    this.clienteService.eliminar(idCliente).subscribe(data =>{
       this.clienteService.listar().subscribe(data => {
         this.clienteService.clienteCambio.next(data);
         this.clienteService.mensajeCambio.next('Registro Eliminado');
       });  
    });
}

mostrarMas(e: any)
{
 //console.log(e);
 this.clienteService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {

     let clientes = JSON.parse(JSON.stringify(data)).content;
     this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;

     this.dataSource = new MatTableDataSource(clientes);
     //this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
 });
}

applyFilter(filterValue: string) {
 filterValue = filterValue.trim();
 filterValue = filterValue.toLowerCase();
 this.dataSource.filter = filterValue;
}
}
