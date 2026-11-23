import { Component, ChangeDetectionStrategy, OnInit, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BodegaService } from '../../services/bodega.service';
import { Producto } from '../../models/producto.model';

/** Fila de la tabla: el producto junto con el nombre de la bodega a la que pertenece. */
interface ProductoConBodega extends Producto {
  bodega: string;
}

@Component({
  selector: 'app-producto-tabla',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './producto-tabla.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductoTablaComponent implements OnInit {
  private readonly bodegaService = inject(BodegaService);

  protected readonly status = signal<'loading' | 'success' | 'error'>('loading');
  protected readonly items = signal<ProductoConBodega[]>([]);

  ngOnInit(): void {
    this.cargar();
  }

  /** Consulta GET /bodegas y aplana los productos de cada bodega en una sola lista. */
  cargar(): void {
    this.status.set('loading');
    this.bodegaService.listar().subscribe({
      next: bodegas => {
        this.items.set(bodegas.flatMap(b => b.productos.map(p => ({ ...p, bodega: b.nombre }))));
        this.status.set('success');
      },
      error: () => this.status.set('error')
    });
  }
}
