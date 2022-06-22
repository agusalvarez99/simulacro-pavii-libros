import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../../services/libros.service';
import { Libros } from '../../models/libros';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
})
export class LibrosComponent implements OnInit {
  titulo: string = 'Libros';
  TituloAccionABMC = {
    A: '(Agregar)',
    B: '(Eliminar)',
    M: '(Modificar)',
    C: '(Consultar)',
    L: '(Listado)',
  };
  AccionABMC: string = 'L';
  submitted = false;
  OpcionesActivo = [
    { Id: null, Nombre: '' },
    { Id: true, Nombre: 'SI' },
    { Id: false, Nombre: 'NO' },
  ];
  Items: Libros[] = [];
  constructor(private librosService: LibrosService) {}
  FormRegistro = new FormGroup({
    Id: new FormControl(0),
    Titulo: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    Stock: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{1,3}'),
    ]),
    Activo: new FormControl(true),
  });
  ngOnInit() {
    this.Buscar();
  }
  Buscar() {
    this.AccionABMC = 'L';
    this.librosService.get().subscribe((res: Libros[]) => {
      this.Items = res;
    });
  }
  Modificar(Item) {
    this.submitted = false;
    this.FormRegistro.markAsUntouched();
    this.BuscarPorId(Item, 'M');
  }
  BuscarPorId(Item, AccionABMC) {
    window.scroll(0, 0); // ir al incio del scroll

    this.librosService.getById(Item.Id).subscribe((res: any) => {
      this.FormRegistro.patchValue(res);
      this.AccionABMC = AccionABMC;
    });
  }

  Volver() {
    this.AccionABMC = 'L';
  }
  Consultar(Item) {
    this.BuscarPorId(Item, 'C');
  }
}
