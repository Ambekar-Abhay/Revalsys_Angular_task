import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path:'',
    component:NavbarComponent,children:[
      { path: 'feedback', loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackModule) },
      { path: 'products', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
      { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
