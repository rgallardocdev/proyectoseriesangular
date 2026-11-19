import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { miServiceSeries } from '../../services/service.series';
import { miSerie } from '../../models/serie';

@Component({
  selector: 'app-home-component',
  standalone: false,
  styleUrl: './home-component.css',
  templateUrl: './home-component.html',
})
export class HomeComponent implements OnInit {

  mensajeSaludo!: string;

  arraySaludo: string[];

  arraySeries: miSerie[];

  constructor(
    private _service: miServiceSeries,
    private _cdr: ChangeDetectorRef
  ){
    this.arraySeries = [];
    this.arraySaludo = [];
  }

  async ngOnInit(): Promise<void>{
    this.arraySaludo = this._service.getSaludo();
    // this.mensajeSaludo = this._service.getSaludo();
    this.arraySeries = await this._service.getSeriesAsync();
    this._cdr.detectChanges();
  }
}
