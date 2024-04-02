import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  isLoading:Observable<boolean>;  

  constructor(private loaderService: LoaderService) {
    this.isLoading = this.loaderService.isLoading.asObservable();
  }
}
