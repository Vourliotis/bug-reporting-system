import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription  } from 'rxjs';
import { BugsService } from 'src/app/services/bugs.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-create-bug',
  templateUrl: './create-bug.component.html',
  styleUrls: ['./create-bug.component.scss']
})
export class CreateBugComponent implements OnInit{
  //commented out also ^^ implements OnDestroy

  createForm: FormGroup
  bugsSubscription: Subscription

  constructor(private fb: FormBuilder, private bugs: BugsService, private router: Router, private formValidationService: FormValidationService) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      priority: [null, Validators.required],
      reporter: [null, Validators.required],
      status: [null]
    })
  }

  ValidateField(formInput:string){
    //adds and Removes validation of QA input
    this.formValidationService.addRemoveValidationsOfQA(this.createForm);
    //adds eachs input CSS Bootstrap validations
    return this.formValidationService.CSSinputValidation(this.createForm, formInput);
  }

  formSubmit(): void{
    if (!this.createForm.valid){
      //if not valid >> touches all inputs for validation
     return this.formValidationService.touchAllFormFields(this.createForm)}
     // Posts form data to server after 100 ms delay
    else this.bugsSubscription = this.bugs.postBug(this.createForm.value).pipe(delay(100)).subscribe(response => {
      this.router.navigate([""])
    })
  }


  // ngOnDestroy(): void {
  //   this.bugsSubscription.unsubscribe
  // }
}