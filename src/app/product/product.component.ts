import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productDetails: any;

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.getProductData()
  }
  getProductData(){
    this.apiService.getProductDetails().subscribe(resp=>{
      if(resp){
        this.productDetails=resp
        console.log(resp)
      }
    })
  }

}
