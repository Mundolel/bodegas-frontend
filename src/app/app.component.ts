import { Component } from '@angular/core';
import { BodegaFormComponent } from './components/bodega-form/bodega-form.component';
import { ProductoTablaComponent } from './components/producto-tabla/producto-tabla.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BodegaFormComponent, ProductoTablaComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  protected readonly title = 'Gestión de Bodegas';
}
