import { Component } from '@angular/core';
import { ProductListComponent } from './components/product-list/product-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent],
  template: `<app-product-list></app-product-list>`,
  styles: [`
    :host { display: block; min-height: 100vh; background-color: #f5f5f5; }
  `]
})
export class AppComponent {}