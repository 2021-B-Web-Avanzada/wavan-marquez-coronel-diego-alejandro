import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AuthService} from "./authservice";
import {Observable} from "rxjs";

@Injectable()
export class EsAdministradorGuard implements CanActivate{
  constructor(private readonly _authService:AuthService, private readonly _router:Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const esAdministrador = this._authService.roles.some((permiso:String)=>permiso==='admin');
    if(!esAdministrador){
      this._router.navigate(["/forbidden"]);
    }
    return esAdministrador;
  }

}
