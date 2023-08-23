import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Dimensions, ImageCropperComponent, ImageTransform} from 'ngx-image-cropper';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular_corp';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageBase64: any = '';
  file:any='';	

  @ViewChild('lgModal') lgModal: any;

  rotateStatus: boolean = false;
  flipHorizontalStatus: boolean = false;
  flipVerticalStatus: boolean = false;
  discardStatus: boolean = false;
  transform:ImageTransform ={}

  

 
  constructor(
    private sanitizer: DomSanitizer, private http: HttpClient
  ) {
  }


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
   // Obtener el archivo seleccionado
  const file = event.target.files[0];
  // Crear un objeto FileReader
  const reader = new FileReader();
   // Leer el archivo como una cadena de datos URL
   reader.readAsDataURL(file);
   // Manejar el evento onload del FileReader
  reader.onload = () => {
    // Obtener la cadena de base64 de la imagen
    this.imageBase64 = reader.result as string;

    // Imprimir la cadena de base64 en la consola
    
  };
}

imageCropped(event: ImageCroppedEvent) {
  this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl ?? ''); 
 
  this.file = this.dataURLtoFile(this.imageBase64, 'myImage.png');
  
}
imageLoaded(image?: LoadedImage) {
    // show cropper
}
cropperReady() {
    // cropper ready
}
loadImageFailed() {
    // show message
}

dataURLtoFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });

}

saveImage(){
  this.lgModal.hide();
  //console.log(this.file); 
  //save image
  alert("Image saved successfully");

}

rotate(){
  this.rotateStatus= true;
  this.flipHorizontalStatus= false;
  this.flipVerticalStatus= false;
  this.discardStatus= false;
 const newValue = ((this.transform.rotate ?? 0) + 90)%360;
 this.transform = {
    ...this.transform,
    rotate: newValue,
  };
  
}
flipX(){
  this.rotateStatus= false;
  this.flipHorizontalStatus= true;
  this.flipVerticalStatus= false;
  this.discardStatus= false;
  this.transform = {
    ...this.transform,
    flipH: !this.transform.flipH,
  };

}
flipY(){
  this.rotateStatus= false;
  this.flipHorizontalStatus= false;
  this.flipVerticalStatus= true;
  this.discardStatus= false;
  this.transform = {
    ...this.transform,
    flipV: !this.transform.flipV,
  };

}
discardChanges(){
  this.rotateStatus= false;
  this.flipHorizontalStatus= false;
  this.flipVerticalStatus= false;
  this.discardStatus= true;
  this.transform = {
    ...this.transform,
    rotate: 0,
    flipH: false,
    flipV: false,
  };
  this.lgModal.hide();
}


 
}
