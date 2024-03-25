import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import {MatDialogModule} from '@angular/material/dialog';

const MaterialComponents   = [
  MatButtonModule,
  MatSlideToggleModule,
  MatDialogModule,
]

@NgModule({
  
  imports: [MaterialComponents
    
  ],
  exports:[MaterialComponents]
})
export class MaterialModule { }
