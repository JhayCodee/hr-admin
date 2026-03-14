import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'; // <-- Herramienta clave
import { EmployeeService } from '../../services/employee.service';
import { EmployeeTableComponent } from '../../components/employee-table/employee-table.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [EmployeeTableComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent {
  private employeeService = inject(EmployeeService);

  // Convertimos la petición HTTP (Observable) a un Signal.
  // toSignal se suscribe automáticamente y se desuscribe al destruir el componente (cero memory leaks).
  employees = toSignal(this.employeeService.getEmployees(), {
    initialValue: [],
  });
}
