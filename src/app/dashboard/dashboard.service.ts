import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = "";
  
  constructor(private httpClient : HttpClient) {
    //this.apiUrl = "https://access-api-ps.herokuapp.com/access-api";
    this.apiUrl = "http://localhost:8081/access-api";
   }

  listar() {

    return this.httpClient.get(this.apiUrl+"/dashboard/ip-useragente");
  }

}
