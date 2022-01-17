import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  estaLogeado = false;

  roles = [
    // 'admin',
    'supervisor',
    'usuario'
  ];

}
