import { Producto } from './producto.model';

export interface Bodega {
  id: number;
  nombre: string;
  ubicacion: string;
  productos: Producto[];
}

export interface BodegaRequest {
  nombre: string;
  ubicacion: string;
}
