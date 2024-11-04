import { Component, inject, OnInit } from '@angular/core';
import { Personaje } from '../../interface/Personaje';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionPersonajesService } from '../../services/gestion-personajes.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit{
  personaje : Personaje = {id: '', nombre: '', alias: '', poder: '', descripcion: ''};

  ruta = inject(ActivatedRoute);
  
  redirec = inject(Router);

  gestion = inject(GestionPersonajesService);

  formulario : FormGroup;

  form_active : boolean = false;

  constructor(private fb : FormBuilder) {
    this.formulario = this.fb.group({
      'nombre': ['',[Validators.required]],
      'alias': ['',[Validators.required]],
      'poder': ['',[Validators.required]],
      'descripcion': ['',[Validators.required]],
    });
  }

  get nombre() { return this.formulario.get('nombre'); }
  get alias() { return this.formulario.get('alias'); }
  get poder() { return this.formulario.get('poder'); }
  get descripcion() { return this.formulario.get('descripcion'); }

  ngOnInit(): void {
    this.getPersonajeDB();
  }

  modificarPersonajeDB() {
    const id = this.ruta.snapshot.paramMap.get('id');
    const id_string = String(id);
    this.personaje = this.formulario.getRawValue();
    this.personaje.id = id_string;

    this.gestion.putPersonaje(id_string, this.personaje).subscribe({
      next: () => {
        alert("Formulario modificado con exito.");
        this.formulario.reset();
        this.form_active = false;
        this.redirec.navigateByUrl('/lista');
      },
      error: (err) => console.log("Error: ", err)
    })
  }

  getPersonajeDB() {
    const id = this.ruta.snapshot.paramMap.get('id');
    const id_string = String(id);
    this.gestion.getPersonaje(id_string).subscribe({
      next: (data) => {
        this.personaje = data;
      },
      error: (err) => console.error("Error", err)
    });
  }

  editar() {
    this.form_active = true;
  }

}
