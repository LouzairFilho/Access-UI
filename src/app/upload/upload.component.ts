import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';
import { Page } from '../modelo/page';
import { Arquivo } from '../modelo/Arquivo';
import { Message } from 'primeng/components/common/message';
import { RespostaAPI } from '../modelo/RespostaAPI';

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

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    this.arquivo = { name: '', size: 0 };
    this.pagina = new Page(0,5);
    
    this.listarArquivos(this.pagina.number, this.pagina.size);

  }



  selecionaArquivo(event) {

    if (event.target.files && event.target.files[0]) {
      this.arquivo = event.target.files[0];
      console.log(this.arquivo);
      if (this.arquivo.size > 20000000) {
        this.labelUpload = "O arquivo " + this.arquivo.name + " excende o tamanho de 20MB";
      } else {
        this.labelUpload = this.arquivo.name;
        this.isEnviarArquivo = 0;
      }

    }
  }

  enviarArquivo() {
    let nomeFile:string =  this.arquivo.name;
    let extencaoFile = nomeFile.substring(nomeFile.length -4);
    console.log(extencaoFile);
    if (extencaoFile == ".log") {
      alert("enviou");
      this.uploadService.upload(this.arquivo).subscribe(
        res => {
          this.listarArquivos(this.pagina.number, this.pagina.size);
        });
        
    }else{
      alert("Formato do arquivo não permitido");
    }

  }
  listarArquivos(page, size) {
    this.uploadService.listar(page, size).subscribe(
      res => {
        this.pagina = <any>res;
        this.listaArquivos = this.pagina.content;
        console.log(this.pagina.content);
      }
    );
  }

  delete(id) {
    this.uploadService.delete(id).subscribe(
      res => {
        let retorno = <RespostaAPI>res;
        this.showMsg('success','', retorno.message);
        this.listarArquivos(this.pagina.number, this.pagina.size);
      },
      err => {
        
        this.showMsg('error','', err.error);
      }
    );
  }

  showMsg(_severity,_summary ,_detail) {
    this.msgs = [];
    this.msgs.push({severity: _severity, summary:_summary, detail:_detail});
}
}
