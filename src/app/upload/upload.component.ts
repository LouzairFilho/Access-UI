import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';
import { Page } from '../modelo/page';
import { Arquivo } from '../modelo/Arquivo';
import { Message } from 'primeng/components/common/message';
import { RespostaAPI } from '../modelo/RespostaAPI';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  pagina: Page;
  listaArquivos: Arquivo[];
  labelUpload = "Click para selecionar um Arquivo para Upload, maximo 20MB";
  isEnviarArquivo = 1;
  arquivo: { name: '', size: 0 };
  msgs: Message[] = [];

  constructor(private uploadService: UploadService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.arquivo = { name: '', size: 0 };
    this.pagina = new Page(0, 5);

    this.listarArquivos(this.pagina.number, this.pagina.size);

  }

  paginar(event){
    this.pagina = new Page(event.page, event.rows);
    this.listarArquivos(this.pagina.number, this.pagina.size);
  }

  selecionaArquivo(event) {
    this.spinner.show();
    if (event.target.files && event.target.files[0]) {
      this.arquivo = event.target.files[0];
      if (this.arquivo.size > 20000000) {
        this.labelUpload = "O arquivo " + this.arquivo.name + " excende o tamanho de 20MB";
      } else {
        this.labelUpload = this.arquivo.name;
        this.isEnviarArquivo = 0;
      }

    }
    this.spinner.hide();
  }

  enviarArquivo() {
    this.spinner.show();
    let nomeFile: string = this.arquivo.name;
    let extencaoFile = nomeFile.substring(nomeFile.length - 4);
    if (extencaoFile == ".log") {

      this.uploadService.upload(this.arquivo).subscribe(
        res => {
          let retorno = <RespostaAPI>res;
          this.showMsg('success', '', retorno.message);
          this.listarArquivos(this.pagina.number, this.pagina.size);
          this.resetaArquivo();
        },
        err => {
          this.showMsg('error', '', err.message);
          this.spinner.hide();
        });

    } else {
      this.showMsg('error', '', "Formato do arquivo não permitido")
      this.spinner.hide();
    }
    
  }
  listarArquivos(page, size) {
    this.spinner.show();
    this.uploadService.listar(page, size).subscribe(
      res => {
        this.pagina = <any>res;
        this.listaArquivos = this.pagina.content;
        this.spinner.hide();
      }
    );
  }

  processarArquivo(id) {
    this.spinner.show();
    this.uploadService.processarArquivo(id).subscribe(
      res => {
        let retorno = <RespostaAPI>res;
        this.showMsg('success', '', retorno.message);
        this.listarArquivos(this.pagina.number, this.pagina.size);
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.showMsg('error', '', err.error);
      }
    );
  }
  delete(id) {
    this.spinner.show();
    this.uploadService.delete(id).subscribe(
      res => {
        let retorno = <RespostaAPI>res;
        this.showMsg('success', '', retorno.message);
        this.listarArquivos(this.pagina.number, this.pagina.size);
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.showMsg('error', '', err.error);
      }
    );
  }

  resetaArquivo(){
    this.arquivo = { name: '', size: 0 };
    this.isEnviarArquivo = 1;
    this.labelUpload = "Click para selecionar um Arquivo para Upload, maximo 20MB";
  }

  showMsg(_severity, _summary, _detail) {
    this.msgs = [];
    this.msgs.push({ severity: _severity, summary: _summary, detail: _detail });
  }
}
