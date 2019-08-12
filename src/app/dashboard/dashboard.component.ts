import { Component, OnInit } from '@angular/core';
import { AccessDashboard } from '../modelo/AccessDashboard';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  listaAccesso: AccessDashboard[];
  dataSet: any;
  labelGrafico: any[];
  dadosGrafico: any[]

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.labelGrafico = [];
    this.dadosGrafico = []
    this.carregarDados();

  }

  carregarDados() {
    this.dashboardService.listar().subscribe(
      res => {
        this.listaAccesso = <any>res;

        this.extraiInfo();
        this.dataSet = {
          labels: this.labelGrafico,
          datasets: [
            {
              label: 'Requisições por Ip',
              data: this.dadosGrafico,
              backgroundColor: this.geraCores(this.listaAccesso.length),

            }]
        };

      }
    );
  }

  extraiInfo() {
    for (var i = 0; i < 100; i++){
      this.labelGrafico.push(this.listaAccesso[i].ip);
      this.dadosGrafico.push(this.listaAccesso[i].quantidade);
    }
  }

  geraCores(quantidade) {
    let hexadecimais = '0123456789ABCDEF';
    let cor = '#';
    let cores = [];
    for (var q = 0; q < quantidade; q++) {
      for (var i = 0; i < 6; i++) {

        cor += hexadecimais[Math.floor(Math.random() * 16)];
      }
      cores.push(cor);
      cor = '#';
    }
    return cores;
  }
}
