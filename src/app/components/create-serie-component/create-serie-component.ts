import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { miServiceSeries } from '../../services/service.series';
import { miSerie } from '../../models/serie';

@Component({
  selector: 'app-create-serie-component',
  standalone: false,
  styleUrl: './create-serie-component.css',
  templateUrl: './create-serie-component.html',
})
export class CreateSerieComponent {

  mensajeProceso!: string;
  nombreArchivo: string = '';

  @ViewChild("cajaidserie") _cajaidserie!: ElementRef;
  @ViewChild("cajanombre") _cajanombre!: ElementRef;
  @ViewChild("cajaimagen") _cajaimagen!: ElementRef;
  @ViewChild("cajaanyo") _cajaanyo!: ElementRef;

  constructor(
    private _service: miServiceSeries,
    private _cdr: ChangeDetectorRef
  ){}

  async createSerie(): Promise<void>{
    let _idserie = parseInt(this._cajaidserie.nativeElement.value);
    let _nombre = this._cajanombre.nativeElement.value;
    let _imagen = "imagenes/" + this.nombreArchivo; //this._cajaimagen.nativeElement.value;
    let _anyo = parseInt(this._cajaanyo.nativeElement.value);

    let _serie = new miSerie(_idserie, _nombre, _imagen, _anyo);
    let response = await this._service.postCrearSerieAsync(_serie);
    this.mensajeProceso = "Serie creada correctamente";
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
