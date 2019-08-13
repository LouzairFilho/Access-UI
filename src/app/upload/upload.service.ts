import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = "";
  
  constructor(private httpClient : HttpClient) {
    //this.apiUrl = "https://access-api-ps.herokuapp.com/access-api";
    this.apiUrl = "http://localhost:8081/access-api";
   }
  
  
  listar(page,size) {
    
    return this.httpClient.get(this.apiUrl+'/arquivos?page='+page+'&size='+size);
  }
  
  upload(file) { 
    
    const formData = new FormData();
    formData.append('file', file);
    
    return this.httpClient.post(this.apiUrl+"/arquivos/upload", formData);
  }
  
  delete(id){
    return this.httpClient.delete(this.apiUrl+"/arquivos/delete/"+id);
  }
  
  processarArquivo(id: any) {
    return this.httpClient.get(this.apiUrl+"/arquivos/processar/"+id);
  }
  
}
