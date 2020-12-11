import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BugsService } from 'src/app/services/bugs.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-edit-bug',
  templateUrl: './edit-bug.component.html',
  styleUrls: ['./edit-bug.component.scss']
})
export class EditBugComponent implements OnInit {
 //commented out also ^^ implements OnDestroy

  updateForm: FormGroup
  // routeSubscription: Subscription
  routeId: string
  // bugsSubscription: Subscription

  constructor(private fb: FormBuilder, private bugs: BugsService, private router: Router, private route: ActivatedRoute, private formValidationService: FormValidationService) { }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      priority: [null, Validators.required],
      reporter: [null, Validators.required],
      status: [null]
    })

    // this.routeSubscription = this.route.params.subscribe(params => {
    //   this.routeId = params['id']
    // });

    this.patchDataToForm()
  }

  patchDataToForm(){
    //Gets the value of current Route with snapshot(URL:id)
    this.routeId = this.route.snapshot.paramMap.get("id")
    //Requests a single bug with the current ID
    this.bugs.getBugById(this.routeId).subscribe(formData =>{
      //inserts it to the form value
      this.updateForm.patchValue(formData)
    });
   }


  ValidateField(formInput:string){
    //adds and Removes validation of QA input
    this.formValidationService.addRemoveValidationsOfQA(this.updateForm);
    //adds eachs input CSS Bootstrap validations
    return this.formValidationService.CSSinputValidation(this.updateForm, formInput);
  }

  formSubmit():void{
    //checks if form is valid
    if (!this.updateForm.valid){
      //if not valid >> touches all inputs for validation
     return this.formValidationService.touchAllFormFields(this.updateForm)}
     // Updates form with my edited form values
    else this.bugs.updateBug(this.routeId, this.updateForm.value).pipe(delay(100)).subscribe(data =>{
      //Navigates back to main component after 100 ms delay
      this.router.navigate([""])
    })
  }

  // patchForm(form: FormGroup){
  //   this.bugs.getBugById(this.routeId).subscribe(bug => {
  //     form.patchValue(bug)
  //   })
  // }
}
