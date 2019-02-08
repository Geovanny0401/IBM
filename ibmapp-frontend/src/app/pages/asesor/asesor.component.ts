import { Component, OnInit, ViewChild } from '@angular/core';
import { Asesor } from './../../_model/asesor';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { AsesorService } from './../../_service/asesor.service';
import { DialogoComponent } from './dialogo/dialogo.component';

@Component({
  selector: 'app-asesor',
  templateUrl: './asesor.component.html',
  styleUrls: ['./asesor.component.css']
})
export class AsesorComponent implements OnInit {

  displayedColumns = ['idAsesor', 'Nombres', 'Especialidad', 'acciones'];
  dataSource: MatTableDataSource<Asesor>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private asesorService: AsesorService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.asesorService.asesorCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.asesorService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });


    this.asesorService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(asesor?: Asesor) {
    let ase = asesor != null ? asesor : new Asesor();
    this.dialog.open(DialogoComponent, {
      width: '250px',
      disableClose: false,
      data: ase
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(asesor: Asesor) {
    this.asesorService.eliminar(asesor.idAsesor).subscribe(data => {
      this.asesorService.listar().subscribe(asesores => {
        this.asesorService.asesorCambio.next(asesores);
        this.asesorService.mensajeCambio.next("Registro Eliminado");
      });
    });
  }

}
