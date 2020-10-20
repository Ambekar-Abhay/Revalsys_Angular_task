import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackForm:FormGroup
  isSuccess: boolean;

  constructor() { }

  ngOnInit(): void {
    this.feedbackForm=new FormGroup({
      name:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.pattern(/^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]),
      message:new FormControl('',Validators.required),

    })
  }
submitFeedback(){
  const data=JSON.stringify(this.feedbackForm.value)
  sessionStorage.setItem('feedbackDetails',data)
  this.feedbackForm.reset()
  this.isSuccess=true
  setTimeout(() => {
    this.isSuccess=false
  }, 2000);
}
}
