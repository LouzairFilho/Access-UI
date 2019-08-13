import { Component, OnInit } from '@angular/core';
import { LogAcessoService } from './log-acesso.service';
import { Access } from '../modelo/Access';
import { Message } from 'primeng/components/common/message';
import { RespostaAPI } from '../modelo/RespostaAPI';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-log-acesso',
  templateUrl: './log-acesso.component.html',
  styleUrls: ['./log-acesso.component.css']
})
export class LogAcessoComponent implements OnInit {

  access: Access;
  msgs: Message[] = [];
  
  constructor(private logAcessoService :LogAcessoService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.access = {data:'',request:'',ip:'',status: '',userAgent: ''};
    this.msgs = [];
  }

  salvar(_access){
    this.spinner.show();
      this.logAcessoService.salvar(_access).subscribe(
        res => {
          let retorno = <RespostaAPI>res;
          this.showMsg('success', '', retorno.message);
          this.access = new Access;
          this.spinner.hide();
        },
        err => {
          this.showMsg('error', '', err.error);
          this.spinner.hide();
        }
      );
  }

  showMsg(_severity, _summary, _detail) {
    this.msgs = [];
    this.msgs.push({ severity: _severity, summary: _summary, detail: _detail });
  }
}
