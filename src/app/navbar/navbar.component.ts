import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  logout(){
    //clearing user data
    sessionStorage.removeItem('loggedInUserDetails')
    sessionStorage.removeItem('feedbackDetails')
    this.route.navigate(['/login'])
  }

}
