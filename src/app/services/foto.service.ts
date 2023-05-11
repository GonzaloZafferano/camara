import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  constructor() { }

  //Lo paso como promesa, porque quiero que haga algo RECIEN cuando consigue la foto, 
  //sino el codigo sigue de largo y todavia no consiguio la foto.
  async sacarFoto() : Promise<string>  {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,

    });
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    //var imageUrl = image.webPath;

    // Can be set to the src of an image now
    //img.src =imageUrl;
    return image.webPath!; //ES UN BLOB.
  };

}