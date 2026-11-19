import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { miServiceSeries } from '../../services/service.series';
import { ActivatedRoute, Params } from '@angular/router';
import { miPersonaje } from '../../models/personaje';

@Component({
  selector: 'app-personaje-component',
  standalone: false,
  styleUrl: './personaje-component.css',
  templateUrl: './personaje-component.html',
})
export class PersonajeComponent implements OnInit {

  _idSerie!: string;
  mensajeParametro!: string;

  arrayPersonajes: miPersonaje[];

  constructor(
    private _service: miServiceSeries,
    private _cdr: ChangeDetectorRef,
    private _active: ActivatedRoute
  ){
    this.arrayPersonajes = [];
  }

  async ngOnInit(): Promise<void> {
    this._active.params.subscribe(async (params: Params) => {
        let _id = params['idSerie'];
        this._idSerie = _id;
        this.mensajeParametro = "ID Serie recibido: " + _id;
        this.arrayPersonajes = await this._service.getPersonajesAsync(_id);
        console.log(this.arrayPersonajes);
        this._cdr.detectChanges();
      })      
  }

}
