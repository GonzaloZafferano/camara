import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, DocumentReference, addDoc, deleteDoc, doc, getDocs, limit, orderBy, query, setDoc, updateDoc, where } from '@angular/fire/firestore';

import { Firestore, collectionData, collection, } from '@angular/fire/firestore';
import { Foto } from '../models/Foto';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private fotos: CollectionReference<DocumentData> =
  collection(this.firestore, 'fotosUsuarios');

  constructor(private firestore: Firestore) { }
  // public guardar(foto: Foto) {
  //   const coleccion = collection(this.firestore, 'fotosUsuarios');
  //   addDoc(coleccion, { ...foto });
  // }

  guardar(foto: Foto) {
    const documentoNuevo = doc(this.fotos);
    const nuevoId = documentoNuevo.id;
    foto.id = nuevoId;
    return setDoc(documentoNuevo, {
      ...foto
    });
  }


  actualizar(foto: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, 'fotosUsuarios');
    const documentoOriginal: DocumentReference<DocumentData> = doc(coleccion, foto.id);
    return updateDoc(documentoOriginal, { ...foto });
  }

  public obtenerFotosTODASObservable() {
    const coleccion = collection(this.firestore, 'fotosUsuarios');
    const q = query(coleccion, orderBy('fecha', 'desc'));
    return collectionData(q);
  }



  public obtenerFotosPorTipoObservable(tipoFoto: number) {
    const coleccion = collection(this.firestore, 'fotosUsuarios');
    const q = query(coleccion, orderBy('fecha', 'asc'), where('fotoCategoria', '==', tipoFoto));
    return collectionData(q);
  }
}
