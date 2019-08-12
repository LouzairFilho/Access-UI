import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = "http://localhost:8081/access-api";

  constructor(private httpClient : HttpClient) { }

  listar() {

    return this.httpClient.get(this.apiUrl+"/dashboard/ip-useragente");
  }

}
