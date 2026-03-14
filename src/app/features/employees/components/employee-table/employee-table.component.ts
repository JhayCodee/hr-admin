import { Component, input } from '@angular/core';
import { Employee } from '../../models/employee.interface';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss',
})
export class EmployeeTableComponent {
  // 🔥 MAGIA MODERNA: input() reemplaza al viejo @Input().
  // Ahora los datos que recibimos también son un Signal, haciendo la app extremadamente rápida.
  data = input<Employee[]>([]);
}
