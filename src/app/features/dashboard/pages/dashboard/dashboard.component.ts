import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { EmployeeService } from '../../../employees/services/employee.service';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [KeyValuePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private employeeService = inject(EmployeeService);

  // Obtenemos la data cruda del backend y la convertimos a Signal
  private employees = toSignal(this.employeeService.getEmployees(), {
    initialValue: [],
  });

  // Estos valores se recalculan SOLOS si la lista de empleados cambia.
  // Son ultra eficientes porque Angular los cachea en memoria.

  totalEmployees = computed(() => this.employees().length);

  activeEmployees = computed(
    () => this.employees().filter((e) => e.status === 'active').length,
  );

  inactiveEmployees = computed(
    () => this.employees().filter((e) => e.status === 'inactive').length,
  );

  // Agrupamos por departamento para un futuro gráfico
  departmentStats = computed(() => {
    const stats: Record<string, number> = {};
    this.employees().forEach((emp) => {
      stats[emp.department] = (stats[emp.department] || 0) + 1;
    });
    return stats;
  });
}
