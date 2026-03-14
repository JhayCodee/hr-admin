// Importa 'output' además de 'input'
import { Component, input, output } from '@angular/core';
import { Employee } from '../../models/employee.interface';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss',
})
export class EmployeeTableComponent {
  data = input<Employee[]>([]);

  onEdit = output<Employee>(); // Emitiremos el empleado completo para editarlo
  onDelete = output<string>(); // Emitiremos solo el ID para borrarlo
}
