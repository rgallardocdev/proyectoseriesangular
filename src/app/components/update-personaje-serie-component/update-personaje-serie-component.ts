import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { miServiceSeries } from '../../services/service.series';
import { miPersonaje } from '../../models/personaje';
import { miSerie } from '../../models/serie';

@Component({
  selector: 'app-update-personaje-serie-component',
  standalone: false,
  styleUrl: './update-personaje-serie-component.css',
  templateUrl: './update-personaje-serie-component.html',
})
export class UpdatePersonajeSerieComponent implements OnInit {

  arrayPersonajes: miPersonaje[];
  arraySeries: miSerie[];

  @ViewChild("selectidserie") _selectidserie!: ElementRef;
  @ViewChild("selectidpersonaje") _selectidpersonaje!: ElementRef;

  mensajeProceso!: string;

  constructor(
    private _service: miServiceSeries,
    private _cdr: ChangeDetectorRef
  ){
    this.arrayPersonajes = [];
    this.arraySeries = [];
  }

  async ngOnInit(): Promise<void> {
    this.arrayPersonajes = await this._service.getPersonajesAsync();
    this.arraySeries = await this._service.getSeriesAsync();
    this._cdr.detectChanges();
  }

  async modificarPersonaje(): Promise<void>{
    let _idSerie = this._selectidserie.nativeElement.value;
    let _idPersonaje = this._selectidpersonaje.nativeElement.value;
    if(_idPersonaje == 0){
      alert("debe seleccionar un personaje");
    }else if(_idSerie == 0){
      alert("debe seleccionar una serie");
    }else {
      console.log(_idPersonaje);
      console.log(_idSerie);
      let response = await this._service.putCambiarPersonajeSerieAsync(_idPersonaje,_idSerie);
      this.mensajeProceso = "Personaje cambiado";
      this._cdr.detectChanges();
    }
  }
}
