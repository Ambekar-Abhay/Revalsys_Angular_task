import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productDetails: any;
  filter=[{"name":'hightolow',"id":1},{"name":'lowtohigh',"id":2}]
  productlength: number=12;
  @HostListener('window:scroll', ['$event']) 
  scrollHandler(event) {
    if(this.productlength==12){
      this.productlength=12*2
    }
    if(this.productlength==24){
      this.productlength=this.productDetails.length
    }
    if(this.productlength==this.productDetails.length){
      this.productlength=this.productDetails.length
    }
  }
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.getProductData()
  }
  getProductData(){
    this.apiService.getProductDetails().subscribe(resp=>{
      if(resp){
        this.productDetails=resp
        console.log(resp)
        this.productDetails.map(x=>{
          var index = x.Images.indexOf("|");
         var img= x.Images.slice(0,index);
          x.Images=x.ListImagePath+img
        })
        this.productDetails.sort(this.dynamicSort("Price"));
        this.productDetails.reverse()
      }
    })
  }
  dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }
  filterChange(event) {
    const filterId = event.target.value
    if (filterId == 1) {
      this.productDetails.sort(this.dynamicSort("Price"));
      this.productDetails.reverse()
    } else {
      this.productDetails.sort(this.dynamicSort("Price"));
    }

  }
}
