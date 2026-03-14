import {
  Component,
  computed,
  effect,
  inject,
  viewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { KeyValuePipe } from '@angular/common';
import { EmployeeService } from '../../../employees/services/employee.service';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables); // Registramos todos los componentes del gráfico

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [KeyValuePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnDestroy {
  private employeeService = inject(EmployeeService);

  private employees = toSignal(this.employeeService.getEmployees(), {
    initialValue: [],
  });

  totalEmployees = computed(() => this.employees().length);
  activeEmployees = computed(
    () => this.employees().filter((e) => e.status === 'active').length,
  );
  inactiveEmployees = computed(
    () => this.employees().filter((e) => e.status === 'inactive').length,
  );

  departmentStats = computed(() => {
    const stats: Record<string, number> = {};
    this.employees().forEach((emp) => {
      stats[emp.department] = (stats[emp.department] || 0) + 1;
    });
    return stats;
  });

  // 🔥 1. NUEVO: Obtenemos el <canvas> del HTML como un Signal
  chartCanvas = viewChild<ElementRef<HTMLCanvasElement>>('myChart');

  // Guardamos la instancia del gráfico para poder destruirla luego
  chartInstance: Chart | null = null;

  constructor() {
    //EL EFFECT: Esta función se ejecuta sola cada vez que departmentStats o chartCanvas cambian
    effect(() => {
      const canvas = this.chartCanvas();
      const stats = this.departmentStats();

      // Si el canvas no está listo o no hay datos, no hacemos nada
      if (!canvas || Object.keys(stats).length === 0) return;

      this.renderChart(canvas.nativeElement, stats);
    });
  }

  // DIBUJAMOS EL GRÁFICO
  renderChart(canvas: HTMLCanvasElement, stats: Record<string, number>) {
    // Si ya existía un gráfico previo, lo destruimos para no encimar uno sobre otro
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const labels = Object.keys(stats); // Ej: ['IT', 'RRHH']
    const data = Object.values(stats); // Ej: [5, 2]

    this.chartInstance = new Chart(canvas, {
      type: 'bar', // Tipo de gráfico
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Cantidad de Empleados',
            data: data,
            backgroundColor: '#3b82f6', // Azul de Tailwind (
            borderRadius: 6, // Bordes redondeados para que se vea moderno
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Permite que se adapte al contenedor padre
        plugins: {
          legend: { display: false }, // Ocultamos la leyenda para que se vea más limpio
        },
      },
    });
  }

  // Si el usuario cambia de página, destruimos el gráfico
  ngOnDestroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }
}
