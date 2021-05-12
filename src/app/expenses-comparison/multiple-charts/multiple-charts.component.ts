import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { chartColors } from '../..//statistics/shared/chart-colors';
import { chartOptions } from '../../statistics/shared/chart-options';

@Component({
  selector: 'app-multiple-charts',
  templateUrl: './multiple-charts.component.html',
  styleUrls: ['./multiple-charts.component.scss']
})
export class MultipleChartsComponent implements OnInit {
  @Input() allCategoriesExpenses!: any;

  chartLabels: any[] = [];
  chartDatasets: any[] = [];
  chartColors: any[] = [];
  chartReady: boolean = false;

  constructor() { }

  ngOnInit() {
    this.initChartData();
    this.chartReady = true;
  }

  private initChartData() {
    const categories = Object.keys(this.allCategoriesExpenses);

    this.initChartLabels(categories);
    this.initChartDatasets(categories);
    this.initChartsColors(categories);
  }

  private initChartLabels(categories: string[]) {
    categories.forEach(category => {
      const months = this.allCategoriesExpenses[category].map((obj: { monthYear: string; }) => obj.monthYear);

      months.forEach((month: string) => {
        if (!this.chartLabels.includes(month)) {
          this.chartLabels.push(month);
        }
      });
    });
  }

  private initChartDatasets(categories: string[]) {
    categories.forEach(category => {
      let expenses: number[] = [];

      for (let i = 0; i < this.chartLabels.length; i++) {
        const monthlyCategoryExpenses: any[] = this.allCategoriesExpenses[category];

        expenses[i] = this.findActualExpenses(monthlyCategoryExpenses, this.chartLabels[i]);
      }

      const chart = { data: expenses, label: category }
      this.chartDatasets.push(chart);
    });
  }

  private findActualExpenses(monthlyCategoryExpenses: any[], labelDate: string): number {
    for (let item of monthlyCategoryExpenses) {
      if (item.monthYear === labelDate) {
        return item.expenses;
      }
    }

    return 0;
  }

  private initChartsColors(keys: string[]) {
    for (let i = 0; i < keys.length; i++) {
      this.chartColors.push(chartColors[i]);
    }
  }

  public chartOptions: any = chartOptions;

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}
