import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { Tarjeta } from './../../_model/tarjeta';
import { TarjetaService } from './../../_service/tarjeta.service';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {

  cantidad: number;
  dataSource: MatTableDataSource<Tarjeta>;
  displayedColumns = ['idTarjeta', 'numtarjeta','tiptarjeta','ccv', 'acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private tarjetaService: TarjetaService,  private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.tarjetaService.tarjetaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.tarjetaService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });


    this.tarjetaService.listarPageable(0, 10).subscribe(data => {
      let tarjetas = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource = new MatTableDataSource(tarjetas);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  eliminar(idTarjeta: number) {
    this.tarjetaService.eliminar(idTarjeta).subscribe(data => {
      this.tarjetaService.listar().subscribe(data => {
        this.tarjetaService.tarjetaCambio.next(data);
        this.tarjetaService.mensajeCambio.next('Se eliminó');
      });
    });
  }

  mostrarMas(e : any){    
    //console.log(e);
    this.tarjetaService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      let tarjetas = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      
      this.dataSource = new MatTableDataSource(tarjetas);
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
