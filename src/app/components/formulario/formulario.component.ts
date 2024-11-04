import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Personaje } from '../../interface/Personaje';
import { GestionPersonajesService } from '../../services/gestion-personajes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  personaje : Personaje = {id: '', nombre: '', alias: '', poder: '', descripcion: ''};

  formulario : FormGroup;

  gestion = inject(GestionPersonajesService);

  redirec = inject(Router);

  constructor(private fb : FormBuilder) {
    this.formulario = this.fb.group({
      'id': ['',[Validators.required]],
      'nombre': ['',[Validators.required]],
      'alias': ['',[Validators.required]],
      'poder': ['',[Validators.required]],
      'descripcion': ['',[Validators.required]],
    });
  }

  get id() { return this.formulario.get('id'); }
  get nombre() { return this.formulario.get('nombre'); }
  get alias() { return this.formulario.get('alias'); }
  get poder() { return this.formulario.get('poder'); }
  get descripcion() { return this.formulario.get('descripcion'); }

  addPersonajeDB() {
    this.personaje = this.formulario.getRawValue();
    this.gestion.postPersonaje(this.personaje).subscribe({
      next: () => {
        alert("Personaje agregado con exito.");
        this.formulario.reset();
        this.redirec.navigateByUrl('/lista');
      },
      error: (err) => console.log("Error: ", err)
    });
  }

  addPersonaje() {
    this.addPersonajeDB();
  }


}
