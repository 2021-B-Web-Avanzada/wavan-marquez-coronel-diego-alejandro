import {Component, OnInit} from '@angular/core';
import {UserJPHService} from '../../servicios/http/user-jph.service';
import {UserJphInterface} from "../../servicios/http/interfaces/user-jph.interface";

@Component({
  selector: 'app-ruta-usuario',
  templateUrl: './ruta-usuario.component.html',
  styleUrls: ['./ruta-usuario.component.scss']
})
export class RutaUsuarioComponent implements OnInit {
  arreglo: UserJphInterface[] = [];
  buscarUsuario: '';

  constructor(
    private readonly userJphService: UserJPHService,
  ) {
  }
  buscarUsuarios(){
    this.userJphService
      .buscarTodos(:{

    })
  }
  ngOnInit(): void {
    this.buscarUsuarios();
    this.userJphService
      .buscarTodos()
      .subscribe({
          next: (datos) => { // try then
            console.log({datos});
          },
          error: (error) => { // catch
            console.error({error});
          },
        }
      )
  }
}
