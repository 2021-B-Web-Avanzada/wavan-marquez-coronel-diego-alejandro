import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-ruta-login',
  templateUrl: './ruta-login.component.html',
  styleUrls: ['./ruta-login.component.scss']
})
export class RutaLoginComponent implements OnInit {

  mostrarSegundoBanner = true;

  arregloUsuarios = [
    {
      id: 1,
      nombre: 'Adrian',
      color: '#00BCFF',
      link: 'https://es-la.facebook.com/',
      linkImagen: 'https://www.adslzone.net/app/uploads-adslzone.net/2019/04/borrar-fondo-imagen.jpg',
    },
    {
      id: 2,
      nombre: 'Vicente',
      color: '#a80c77',
      link: 'https://www.epn.edu.ec/',
      linkImagen: 'https://ilmaistro.com/wp-content/uploads/clipmagic-cambiar-fondo.jpg',
    }
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

  cambiarOcultarBanner() {
    this.mostrarSegundoBanner = !this.mostrarSegundoBanner;
  }

}
