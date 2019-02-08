import { Component, OnInit, Inject } from '@angular/core';
import { Asesor } from './../../../_model/asesor';
import { AsesorService } from './../../../_service/asesor.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent implements OnInit {

  asesor: Asesor;
  constructor(private dialogRef: MatDialogRef<DialogoComponent>, @Inject(MAT_DIALOG_DATA) public data: Asesor, private asesorService: AsesorService) { }

  ngOnInit() {

    this.asesor = new Asesor();
    this.asesor.idAsesor = this.data.idAsesor;
    this.asesor.nombre = this.data.nombre;
    this.asesor.especialidad = this.data.especialidad;
  }

  cancelar() {
    this.dialogRef.close();
  }

  operar() {
    if (this.asesor != null && this.asesor.idAsesor > 0) {
      this.asesorService.modificar(this.asesor).subscribe(data => {
        this.asesorService.listar().subscribe(asesores => {
          this.asesorService.asesorCambio.next(asesores);
          this.asesorService.mensajeCambio.next("Registro Actualizado");
        });
      });
    } else {
      this.asesorService.registrar(this.asesor).subscribe(data => {
        this.asesorService.listar().subscribe(asesores => {
          this.asesorService.asesorCambio.next(asesores);
          this.asesorService.mensajeCambio.next("Registro Exitoso");
        });
      });
    }
    this.dialogRef.close();
  }

}
