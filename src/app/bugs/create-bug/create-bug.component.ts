import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BugsService } from 'src/app/services/bugs.service';

@Component({
  selector: 'app-create-bug',
  templateUrl: './create-bug.component.html',
  styleUrls: ['./create-bug.component.scss']
})
export class CreateBugComponent implements OnInit, OnDestroy {

  createForm: FormGroup
  bugsSubscription: Subscription

  constructor(private fb: FormBuilder, private bugs: BugsService, private router: Router) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      priority: [null, Validators.required],
      reporter: [null, Validators.required],
      status: [null, Validators.required]
    })

    this.createForm.controls['reporter'].valueChanges.subscribe(value => {
      console.log(value)
      if(value == "QA"){
        this.createForm.controls['status'].setValidators(Validators.required);
      }else{
        this.createForm.controls['status'].clearValidators();
      }
      this.createForm.controls['status'].updateValueAndValidity();
    })
  }

  ngOnDestroy(): void {
    this.bugsSubscription.unsubscribe
  }

  formSubmit(form: FormGroup): void{
    this.bugsSubscription = this.bugs.postBug(form.value).subscribe(response => {
      console.log("POSTED")
    })
    
    setTimeout (() => {
      this.router.navigate([""])
    },100);
  }

  patchForm(){
    
  }

}
