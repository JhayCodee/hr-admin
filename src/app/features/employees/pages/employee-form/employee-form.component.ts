import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.interface';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink], // Importante para [formGroup] y routerLink
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Estados
  isEditMode = signal(false);
  currentId = signal<string | null>(null);
  //Signal para controlar si estamos enviando datos
  isSubmitting = signal(false);

  // Nuestro formulario tipado
  employeeForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    position: ['', Validators.required],
    department: ['', Validators.required],
    status: ['active' as 'active' | 'inactive', Validators.required],
  });

  get controls() {
    return this.employeeForm.controls;
  }

  ngOnInit() {
    // Revisamos si la URL tiene un parámetro 'id'
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode.set(true);
      this.currentId.set(id);
      this.loadEmployeeData(id);
    }
  }

  loadEmployeeData(id: string) {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (employee) => {
        // Llenamos el formulario con los datos de la base de datos
        this.employeeForm.patchValue({
          name: employee.name,
          position: employee.position,
          department: employee.department,
          status: employee.status,
        });
      },
      error: () => {
        console.error('Empleado no encontrado');
        this.router.navigate(['/empleados']);
      },
    });
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    // 🔥 Activamos el estado de carga
    this.isSubmitting.set(true);

    const formData = this.employeeForm.getRawValue();

    if (this.isEditMode() && this.currentId()) {
      this.employeeService
        .updateEmployee(this.currentId()!, formData)
        .subscribe({
          next: () => {
            this.isSubmitting.set(false); // Apagamos
            this.router.navigate(['/empleados']);
          },
          error: (err) => {
            this.isSubmitting.set(false); // Apagamos en caso de error
            console.error(err);
          },
        });
    } else {
      this.employeeService.createEmployee(formData).subscribe({
        next: () => {
          this.isSubmitting.set(false); // Apagamos
          this.router.navigate(['/empleados']);
        },
        error: (err) => {
          this.isSubmitting.set(false); // Apagamos
          console.error(err);
        },
      });
    }
  }
}
