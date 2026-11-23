import { Component, ChangeDetectionStrategy, inject, output, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BodegaService } from '../../services/bodega.service';
import { Bodega } from '../../models/bodega.model';

@Component({
  selector: 'app-bodega-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './bodega-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodegaFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly bodegaService = inject(BodegaService);

  readonly registrada = output<Bodega>();

  protected readonly saving = signal(false);
  protected readonly message = signal('');

  protected readonly form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    ubicacion: ['', Validators.required]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.message.set('');

    this.bodegaService.registrar(this.form.getRawValue()).subscribe({
      next: bodega => {
        this.saving.set(false);
        this.message.set(`Bodega "${bodega.nombre}" registrada`);
        this.form.reset();
        this.registrada.emit(bodega);
      },
      error: () => {
        this.saving.set(false);
        this.message.set('No fue posible registrar la bodega');
      }
    });
  }
}
