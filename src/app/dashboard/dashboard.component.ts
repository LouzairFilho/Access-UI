import { Component, OnInit } from '@angular/core';
import { AccessDashboard } from '../modelo/AccessDashboard';
import { DashboardService } from './dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';

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

  constructor(private dashboardService: DashboardService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.labelGrafico = [];
    this.dadosGrafico = []
    this.carregarDados();

  }

  carregarDados() {
    this.spinner.show();
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
        this.spinner.hide();
      }
    );
  }

 extraiInfo() {
    let limite = this.listaAccesso.length;
    if(this.listaAccesso.length>100){
      limite = 100
    }
    for (var i = 0; i < limite; i++){
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
