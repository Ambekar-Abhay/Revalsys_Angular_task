import { NgModule } from '@angular/core';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback.component';
import { SharedModule } from '../services/shared.module';


@NgModule({
  declarations: [FeedbackComponent],
  imports: [
    SharedModule,
    FeedbackRoutingModule
  ]
})
export class FeedbackModule { }
