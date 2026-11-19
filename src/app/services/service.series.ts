import { Injectable } from "@angular/core";
import { miSerie } from "../models/serie";
import { environment } from "../../environments/environment.development";
import { firstValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { miPersonaje } from "../models/personaje";

@Injectable()

export class miServiceSeries{

    arraySaludo: string[];

    constructor(
        private _http: HttpClient
    ){
        this.arraySaludo = [];
    }

    getSaludo(): string[]{
        this.arraySaludo[0] = "Bienvenido a la API de Series";
        this.arraySaludo[1] = "Uso de APIs para navegar por distintas series.";
        this.arraySaludo[2] = "esta es la ficha de la serie";
        return this.arraySaludo;
        // return "Bienvenido a la API de Series";
    }

    async getSeriesAsync(): Promise<miSerie[]>{
        let request = "/api/series";
        let ruta = environment.apiSeries + request;
        let response =  await firstValueFrom (this._http.get<miSerie[]>(ruta));
        return response;
    }

    async getUnaSerieAsync(idSerie: number): Promise<miSerie>{
        let request = "/api/series/" + idSerie;
        let ruta = environment.apiSeries + request;
        let response =  await firstValueFrom (this._http.get<miSerie>(ruta));
        return response;
    }    

    async getPersonajesAsync(idSerie: number): Promise<miPersonaje[]>{
        let request = "/api/Series/PersonajesSerie/" + idSerie;
        let ruta = environment.apiSeries + request;
        let response =  await firstValueFrom (this._http.get<miPersonaje[]>(ruta));
        return response;
    }

}