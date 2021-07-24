import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interfaces';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {}
  team: any[] = [];

  constructor( private http: HttpClient) { 
    console.log("Services loaded!");

    this.loadInfo();

    this.loadTeam();
    
  }

  private loadInfo() {
    this.http.get('assets/data/data-info.json').subscribe((resp: InfoPagina) => { 
      console.log(resp);     
      this.info = resp;
    });
  }

  private loadTeam(){
    this.http.get('https://angular-2146b-default-rtdb.firebaseio.com/equipo.json').subscribe((resp: any) => { 
      console.log(resp);     
      this.team = resp;
    });
  }
}
