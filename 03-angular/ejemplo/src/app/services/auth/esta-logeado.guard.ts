import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AuthService} from "./authservice";
import {Observable} from "rxjs";

@Injectable()
export class EstaLogeadoGuard implements CanActivate{
  //Inyeccion de dependencias-> importando servicio en servicio para utilizar metodos
  constructor(private readonly _authService:AuthService, private readonly _router:Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this._authService.estaLogeado){
      this._router.navigate(["./forbidden"]);
    }
    return this._authService.estaLogeado;//boolean
  }

}
