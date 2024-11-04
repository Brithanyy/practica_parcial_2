import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personaje } from '../interface/Personaje';

@Injectable({
  providedIn: 'root'
})
export class GestionPersonajesService {

  constructor() { }

  http = inject(HttpClient);
  url_base = 'http://localhost:3000/personajes';

  getPersonaje(id : string) : Observable<Personaje> {
    return this.http.get<Personaje>(`${this.url_base}/${id}`);
  }

  getPersonajes() : Observable<Personaje[]> {
    return this.http.get<Personaje[]>(this.url_base);
  }

  postPersonaje(personaje : Personaje) : Observable<Personaje> {
    return this.http.post<Personaje>(this.url_base,personaje);
  }

  putPersonaje(id: string, personaje : Personaje) : Observable<Personaje> {
    return this.http.put<Personaje>(`${this.url_base}/${id}`, personaje)
  }

  deletePersonaje(id: string) : Observable<Personaje> {
    return this.http.delete<Personaje>(`${this.url_base}/${id}`);
  }
}
