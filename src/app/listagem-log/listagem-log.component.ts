import { Component, OnInit } from '@angular/core';
import { Page } from '../modelo/page';
import { Message } from 'primeng/components/common/message';
import { LogAcessoService } from '../log-acesso/log-acesso.service';
import { RespostaAPI } from '../modelo/RespostaAPI';

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

  constructor(private logAcessoService: LogAcessoService) { }

  ngOnInit() {
    this.filtro = { ip:'',userAgent:'' }
    this.pagina = new Page(0, 10);

    this.listarAccess(this.pagina.number, this.pagina.size);
  }
  listarAccess(page, size) {
    this.logAcessoService.listar(page, size).subscribe(
      res => {
        this.pagina = <any>res;
        this.listaLog = this.pagina.content;
      }
    );
  }

  filtrar(){
    console.log("asdaspofffffffffffffff");
    if(this.filtro.ip.length >= 5 || this.filtro.userAgent.length >= 5){
      this.pagina = new Page(0, 10);
      this.logAcessoService.filtrar(this.pagina.number, this.pagina.size,this.filtro).subscribe(
        res => {
          let retorno = <RespostaAPI>res;
          this.pagina = retorno.data;
          this.listaLog = this.pagina.content;
        }
      );
    }
  }

  delete(id) {
    this.logAcessoService.delete(id).subscribe(
      res => {
        let retorno = <RespostaAPI>res;
        this.showMsg('success', '', retorno.message);
        this.listarAccess(this.pagina.number, this.pagina.size);
      },
      err => {

        this.showMsg('error', '', err.error);
      }
    );
  }

  showMsg(_severity, _summary, _detail) {
    this.msgs = [];
    this.msgs.push({ severity: _severity, summary: _summary, detail: _detail });
  }
}
