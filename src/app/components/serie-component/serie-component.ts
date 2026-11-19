import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { miServiceSeries } from '../../services/service.series';
import { ActivatedRoute, Params } from '@angular/router';
import { miSerie } from '../../models/serie';

@Component({
  selector: 'app-serie-component',
  standalone: false,
  styleUrl: './serie-component.css',
  templateUrl: './serie-component.html',
})
export class SerieComponent implements OnInit {

  mensajeParametro!: string;

  _miSerie!: miSerie;

  _idSerie!: number;

  arraySaludo : string[];

  constructor(
    private _service: miServiceSeries,
    private _active: ActivatedRoute,
    private _cdr: ChangeDetectorRef
  ){
    this.arraySaludo = [];
  }

  async ngOnInit(): Promise<void>{
    this._active.params.subscribe(async (params: Params) => {
        this.arraySaludo = this._service.getSaludo();
        let _id = params['idSerie'];
        this._idSerie = _id;
        this.mensajeParametro = "ID Serie recibido: " + _id;
        this._miSerie = await this._service.getUnaSerieAsync(_id);
        console.log(this._miSerie);
        this._cdr.detectChanges();
      })    
  }

}
