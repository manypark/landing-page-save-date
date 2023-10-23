import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  private basePath = '/benefit';

  constructor( private storage: AngularFireStorage ) { }

  pushFileToStorage(fileUpload: any): Observable<number | undefined> {

    const filePath = `${this.basePath}/${fileUpload.name}`;
    const uploadTask = this.storage.upload(filePath, fileUpload);

    uploadTask.snapshotChanges().subscribe();

    return uploadTask.percentageChanges();
  }


}
