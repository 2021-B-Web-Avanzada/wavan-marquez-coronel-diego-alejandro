import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-imagenes',
  templateUrl: './banner-imagenes.component.html',
  styleUrls: ['./banner-imagenes.component.scss']
})
export class BannerImagenesComponent implements OnInit {
  nombre = 'David';
  apellido = 'Aguirre';

  mascotas = {
    cachetes:{
      edad:7,
    }
  }
  fecha = new Date();
  sueldo = 1000;
  url = 'http://www.google.com';
  urlImg = 'https://www.allente.se/contentassets/1a302a78398545b597d71a5de6442033/se_fotbollsarena_2880x1000.jpg?format=jpeg&fastscale=True&down.colorspace=linear&width=1300&height=451';
  constructor() { }

  ngOnInit(): void {
  }
ejecutarEventoClick(){
    console.log({mensaje: "Click"});
}
ejecutarEventoBlur(){
    console.log({mensaje:"Blur"});
}
}
