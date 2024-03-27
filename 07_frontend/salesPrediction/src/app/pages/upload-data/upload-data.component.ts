import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { UploadDataService } from '../../services/upload-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrl: './upload-data.component.css'
})
export class UploadDataComponent {

  constructor(private uploadData:UploadDataService,private router:Router){}
  navBackground:string = '#211E1E'
  file: File | null = null;
  fileTitle:string=''
  periodicity:string=''
  predictColumn:string=''
  dateColumn:string=''
  isdisabled:Boolean = false

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
      this.file = files[0];
    }
  }


  

  onFileSelected(event: any) {
    // if (event.target.files.length > 0) {
    //   this.file = event.target.files[0];
    // }
    const files = event.target.files;
    if (files && files.length > 0) {
      this.file = files[0];
    }
  }
  handleSubmit(){

    // console.log(this.file);
    // console.log(this.fileTitle);
    // console.log(this.periodicity);
    // console.log(this.dateColumn);
    // console.log(this.predictColumn);
  
    // console.log(this.uploadData.token);
    const formData = new FormData()
    if(this.file){

      formData.append('file', this.file,this.file.name); // Make sure this.file contains the file data
    }
    formData.append('fileTitle', this.fileTitle);
    formData.append('periodicity', this.periodicity);
    formData.append('dateColumn', this.dateColumn);
    formData.append('predictColumn', this.predictColumn);

   
    
    
    
    this.uploadData.uploadData(formData).subscribe({
      next:(response)=>{
        console.log(response);
        this.router.navigate(['/prediction'],{queryParams:{title:this.fileTitle}})
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    
    
    
    
  }

}
