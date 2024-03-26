import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrl: './upload-data.component.css'
})
export class UploadDataComponent {

  navBackground:string = '#211E1E'
  selectedFile: File | null = null;
  fileTitle:string=''
  periodicity:string=''
  predictColumn:string=''
  dateColumn:string=''

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    // Add visual feedback
    // event.target.classList.add('dragover');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    // Remove visual feedback
    // event.target.classList.remove('dragover');
  }
  onDrop(event:DragEvent){
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
    }
  }


  

  onFileSelected(event: any) {
    // if (event.target.files.length > 0) {
    //   this.file = event.target.files[0];
    // }
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
    }
  }

}
