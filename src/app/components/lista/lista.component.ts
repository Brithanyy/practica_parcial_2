import { Component, inject, OnInit } from '@angular/core';
import { Personaje } from '../../interface/Personaje';
import { GestionPersonajesService } from '../../services/gestion-personajes.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent implements OnInit{

  personajes : Personaje[] = [];

  gestion = inject(GestionPersonajesService);

  redirec = inject(Router);

  ngOnInit(): void {
    this.getPersonajesDB();
  }

  getPersonajesDB() {
    this.gestion.getPersonajes().subscribe({
      next: (data) => this.personajes = data,
      error: (err) => console.error("Error: ", err)
    });
  }

  deletePersonaje(id : string) {
    this.gestion.deletePersonaje(id).subscribe({
      next: () => {
        alert("Personaje eliminado con exito");
        this.personajes = this.personajes.filter(personajes => personajes.id != id);
      },
      error: (err) => console.error("Error: ", err)
    })
  }

  detalle(id : string) {
    this.redirec.navigate(['detalle', id]);
  }
}
