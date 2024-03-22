import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'
import {MatSlideToggleModule} from '@angular/material/slide-toggle'

const MaterialComponents   = [
  MatButtonModule,
  MatSlideToggleModule,
]

@NgModule({
  
  imports: [MaterialComponents
    
  ],
  exports:[MaterialComponents]
})
export class MaterialModule { }
