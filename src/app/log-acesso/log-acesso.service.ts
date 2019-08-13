import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogAcessoService {
  private apiUrl = "";
  
  constructor(private httpClient : HttpClient) {
    //this.apiUrl = "https://access-api-ps.herokuapp.com/access-api";
    this.apiUrl = "http://localhost:8081/access-api";
   }

  listar(page,size) {

    return this.httpClient.get(this.apiUrl+'/accesss?page='+page+'&size='+size);
  }

  delete(id){
    return this.httpClient.delete(this.apiUrl+"/accesss/delete/"+id);
  }


  filtrar(page, size,filtro){
    let headers = new HttpHeaders().set('Content-Type','application/json');

    let r = this.httpClient.post(this.apiUrl + "/accesss/filtro"+'?page='+page+'&size='+size, filtro, { headers });
    return r ;
  }

  salvar(access){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    console.log(access)
    let r = this.httpClient.post(this.apiUrl + "/accesss/save",access , { headers });
    return r ;
  }
}


