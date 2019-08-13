import { Component, OnInit } from '@angular/core';
import { Page } from '../modelo/page';
import { Message } from 'primeng/components/common/message';
import { LogAcessoService } from '../log-acesso/log-acesso.service';
import { RespostaAPI } from '../modelo/RespostaAPI';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-listagem-log',
  templateUrl: './listagem-log.component.html',
  styleUrls: ['./listagem-log.component.css']
})
export class ListagemLogComponent implements OnInit {
  listaLog: [];
  pagina: Page;
  msgs: Message[] = [];
  filtro:{ip:string, userAgent:String};
  isFiltrando = false;

  constructor(private logAcessoService: LogAcessoService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.filtro = { ip:'',userAgent:'' }
    this.pagina = new Page(0, 10);

    this.listarAccess(this.pagina.number, this.pagina.size);
  }

  listarAccess(page, size) {
    this.spinner.show();
    this.logAcessoService.listar(page, size).subscribe(
      res => {
        this.pagina = <any>res;
        this.listaLog = this.pagina.content;
        this.isFiltrando = false;
        this.spinner.hide();
      }
    );
  }

  filtrarAccess(page, size){
    this.spinner.show();
    this.logAcessoService.filtrar(page, size,this.filtro).subscribe(
      res => {
        let retorno = <RespostaAPI>res;
        this.pagina = retorno.data;
        this.listaLog = this.pagina.content;
        this.isFiltrando = true;
      }
    );
  }

  paginar(event){
    this.pagina = new Page(event.page, event.rows);
    if(this.isFiltrando){
      this.filtrarAccess(this.pagina.number, this.pagina.size);
    }else{
      this.listarAccess(this.pagina.number, this.pagina.size);
    }
  }

  filtrar(){
    if(this.filtro.ip.length >= 5 || this.filtro.userAgent.length >= 5){
      this.pagina = new Page(0, 10);
      this.filtrarAccess(this.pagina.number, this.pagina.size);
    }
  }

  delete(id) {
    this.spinner.show();
    this.logAcessoService.delete(id).subscribe(
      res => {
        let retorno = <RespostaAPI>res;
        this.showMsg('success', '', retorno.message);
        this.listarAccess(this.pagina.number, this.pagina.size);
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.showMsg('error', '', err.error);

      }
    );
  }

  showMsg(_severity, _summary, _detail) {
    this.msgs = [];
    this.msgs.push({ severity: _severity, summary: _summary, detail: _detail });
  }


}
