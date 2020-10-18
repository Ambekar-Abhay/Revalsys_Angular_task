import { Injectable } from '@angular/core';
import{HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http:HttpClient) { }
//to fetch prodct details
  getProductDetails():Observable<any>{
    return this.http.get("./assets/sampleData.json");
  }
}
