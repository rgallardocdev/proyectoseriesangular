import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { miServiceSeries } from '../../services/service.series';
import { ActivatedRoute } from '@angular/router';
import { miSerie } from '../../models/serie';
import { ExternalReference } from '@angular/compiler';
import { miPersonaje } from '../../models/personaje';

@Component({
  selector: 'app-create-personaje-component',
  standalone: false,
  styleUrl: './create-personaje-component.css',
  templateUrl: './create-personaje-component.html',
})
export class CreatePersonajeComponent implements OnInit {

  arraySeries: miSerie[];

  @ViewChild("cajaidpersonaje") _cajaidpersonaje!: ElementRef;
  @ViewChild("cajanombre") _cajanombre!: ElementRef;
  @ViewChild("cajaimagen") _cajaimagen!: ElementRef;
  @ViewChild("selectidserie") _selectidserie!: ElementRef;

  mensajeProceso!: string;

  nombreArchivo: string = '';

  constructor(
    private _service: miServiceSeries,
    private _cdr: ChangeDetectorRef,
  ){
    this.arraySeries = [];
  }

  async ngOnInit(): Promise<void> {
    this.arraySeries = await this._service.getSeriesAsync();
    this._cdr.detectChanges();
  }

  async createPersonaje(): Promise<void> {
    console.log("nombre: " + this.nombreArchivo);
    let _idpersonaje = parseInt(this._cajaidpersonaje.nativeElement.value);
    let _nombre = this._cajanombre.nativeElement.value;
    let _imagen = "imagenes/" + this.nombreArchivo; //this._cajaimagen.nativeElement.value;
    let _idserie = parseInt(this._selectidserie.nativeElement.value);
    let _personaje = new miPersonaje(_idpersonaje, _nombre, _imagen, _idserie);
    let response = await this._service.postCrearPersonajeAsync(_personaje);
    this.mensajeProceso = "Personaje creado correctamente";
    this._cdr.detectChanges();
  }
  
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      // 1. Nombre limpio (ej: "goku.jpg", sin C:\fakepath\)
      this.nombreArchivo = file.name;
    }
  }

}
