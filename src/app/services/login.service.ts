import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public usuarioActual : any;
  constructor(private auth: AngularFireAuth) { 
    this.auth.authState.subscribe(x =>{
      this.usuarioActual =x;
    });
  }

  registrarUsuario(usuario:string, password:string){
    return this.auth.createUserWithEmailAndPassword(usuario, password);
  }

  loguearUsuario(usuario:string, password:string){
    return this.auth.signInWithEmailAndPassword(usuario, password);
  }

  desloguear(){
    return this.auth.signOut();
  }
}
