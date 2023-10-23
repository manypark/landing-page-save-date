import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileUpload } from 'primeng/fileupload';
import { ToastService } from 'src/app/services/toast.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

interface ImagesFromFirebase {
  itemImageSrc:string;
  thumbnailImageSrc:string;
  alt:string;
  title:string;
}

@Component({
  selector    : 'app-upload-images',
  standalone  : true,
  imports     : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
  ],
  templateUrl : './upload-images.component.html',
  styleUrls   : ['./upload-images.component.scss'],
  providers   : [ MessageService ],
})
export class UploadImagesComponent implements OnInit {

  private messageService: MessageService = inject(MessageService);
  private uploadService : FirebaseStorageService = inject(FirebaseStorageService);
  private storage       : AngularFireStorage = inject(AngularFireStorage);
  private toastServices : ToastService = inject(ToastService);

  rows        : number = 4;
  currentPage : number = 0;
  images      : ImagesFromFirebase[] = [
    {
      itemImageSrc: 'https://via.placeholder.com/150',
      thumbnailImageSrc: 'https://via.placeholder.com/150',
      alt: 'Description for Image 1',
      title: 'Title 1'
    },
  ];
  indexImages:number = 0;
  displayBasic: boolean | undefined;
  responsiveOptions: any[] = [
    {
        breakpoint: '1500px',
        numVisible: 5
    },
    {
        breakpoint: '1024px',
        numVisible: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];
  isUploadingImage:boolean = false;

  ngOnInit(): void {
    this.getFilesList();
  }

  onUpload( event:any ) {

    this.isUploadingImage = true;

    if ( event.files ) {
      const file: File | null = event.files;

      if (file) {

        this.uploadService.pushFileToStorage(file).subscribe({
          next:( percentage:any ) => {
            
          },
          error: (err) => {
            console.log(err);
            this.isUploadingImage = false;
          },
          complete: () => {
            this.isUploadingImage = false;
            this.toastServices.openSuccessSnakcBar('Upload image sucessful');
            this.getFilesList();
          }
        });
      }
    }
  }

  onPageChange(event: any) {
    this.currentPage = event.page;
  }

  showImageGallery( nameImage:string ) {

    this.displayBasic = true;

    const indexFromImages = this.images.findIndex( img => img.itemImageSrc == nameImage );

    this.indexImages = indexFromImages;
  }

  getFilesList() {
    const storageRef = this.storage.storage.ref();

    const folderRef = storageRef.child('benefit'); // Reemplaza 'tu_carpeta_en_storage' con el nombre de tu carpeta

    folderRef.listAll().then((res) => {

      res.items.forEach( (file) => {

        this.images = [];
        
        file.getDownloadURL().then((url:any) => {

          this.images.push({
            alt: 'image benefit',
            title: 'image benefit',
            itemImageSrc: url,
            thumbnailImageSrc: url,
          });
          
          console.log(this.images);

        }).catch((error:any) => {
          console.log('Error al obtener la URL de descarga: ', error);
        });
      });

    }).catch((error) => {
      console.log('Error al obtener la lista de archivos: ', error);
    });
  }


}
