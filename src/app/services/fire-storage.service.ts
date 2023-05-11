import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Photo } from '@capacitor/camera';

import {
  Observable,
  concat,
  defer,
  finalize,
  ignoreElements,
  last,
  switchMap,
} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  constructor(private storage: AngularFireStorage) { }

  cargarFoto(imagen: File, nombreImagen: string): Observable<string> {
    const fileRef = this.storage.ref(nombreImagen);
    const task = this.storage.upload(nombreImagen, imagen);
    return concat(
      task.snapshotChanges().pipe(ignoreElements()),
      defer(() => fileRef.getDownloadURL())
    );
  }

  obtenerFoto(url: string) {
    return this.storage.storage.refFromURL(url);
  }
}
