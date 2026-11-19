import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { miSerie } from '../../models/serie';
import { miServiceSeries } from '../../services/service.series';

@Component({
  selector: 'app-menu-component',
  standalone: false,
  styleUrl: './menu-component.css',
  templateUrl: './menu-component.html',
})
export class MenuComponent implements OnInit {

  arraySeries: miSerie[];

  constructor(
    private _service: miServiceSeries,
    private _cdr: ChangeDetectorRef
  ){
    this.arraySeries = [];
  }

  async ngOnInit(): Promise<void>{
    this.arraySeries = await this._service.getSeriesAsync();
    this._cdr.detectChanges();
  }
}