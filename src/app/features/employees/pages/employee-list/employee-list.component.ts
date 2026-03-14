import { Component, inject, OnInit, signal } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeTableComponent } from '../../components/employee-table/employee-table.component';
import { Employee } from '../../models/employee.interface';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [EmployeeTableComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit {
  private employeeService = inject(EmployeeService);

  // Usamos un signal normal (Writable) que inicia vacío
  employees = signal<Employee[]>([]);

  // Cargamos los datos al iniciar el componente
  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => this.employees.set(data),
      error: (err) => console.error('Error cargando empleados', err),
    });
  }

  // Escuchamos el evento de eliminación del hijo
  handleDelete(id: string) {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          // Si el backend lo borró con éxito, recargamos la lista
          this.loadEmployees();
        },
        error: (err) => console.error('Error al eliminar', err),
      });
    }
  }

  handleEdit(employee: Employee) {
    console.log('Navegar al formulario de edición con:', employee);
  }
}
