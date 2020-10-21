import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productDetails: any;
  filter=[{"name":'hightolow',"id":1},{"name":'lowtohigh',"id":2}]
  productlength: number=12;
  param: any;
  selectedFilterId:number=1
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
  constructor(private apiService:ApiService, private route:ActivatedRoute,private _route:Router) { 

  }

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
        this.filterProductbyUrl()
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
  //To filter product data 
  filterChange(event,id?) {
    var filterId
    if(id){
       filterId=id
    }else{
       filterId = event.target.value
    } 
    if (filterId == 1) {
      this.productDetails.sort(this.dynamicSort("Price"));
      this.productDetails.reverse()
      this.changeQueryParam('hightolow')
    } else {
      this.productDetails.sort(this.dynamicSort("Price"));
     this.changeQueryParam('lowtohigh')
 
    }
  }
  //to Update query param on dropdown filter change
  changeQueryParam(value){
    this._route.navigate([],{
      queryParams: {
       sortType: value,
      }
    })
  }
  //Filter product details based on querey param
  filterProductbyUrl(){
    this.route.queryParamMap.subscribe(resp=>{
      this.param = resp['params'];
      console.log(this.param)
      if(this.param.sortType=='hightolow'){
          this.productDetails.sort(this.dynamicSort("Price"));
          this.productDetails.reverse()
         this.selectedFilterId=1
      }

       if(this.param.sortType=='lowtohigh'){
         this.selectedFilterId=2
       this.productDetails.sort(this.dynamicSort("Price"));
      }
   })
  }
}
