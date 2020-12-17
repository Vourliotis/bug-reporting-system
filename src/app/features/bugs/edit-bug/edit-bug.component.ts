import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BugsService } from '../services/bugs.service';
import { FormValidationService } from '../services/form-validation.service';

@Component({
  selector: 'app-edit-bug',
  templateUrl: './edit-bug.component.html',
  styleUrls: ['./edit-bug.component.scss'],
})
export class EditBugComponent implements OnInit {
  //commented out also ^^ implements OnDestroy
  commentsArray: Array<object>;
  updateForm: FormGroup;
  // routeSubscription: Subscription
  routeId: string;
  // bugsSubscription: Subscription
  unSaved: boolean = true;

  get comments() {
    return this.updateForm.get('comments') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private bugsService: BugsService,
    private router: Router,
    private route: ActivatedRoute,
    private formValidationService: FormValidationService
  ) {}

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      priority: [null, Validators.required],
      reporter: [null, Validators.required],
      status: [null],
      comments: this.fb.array([]),
    });
    // this.routeSubscription = this.route.params.subscribe(params => {
    //   this.routeId = params['id']
    // });
    this.patchDataToForm();
  }

  //function also called in html , use of insert 0 to push the first item first
  addComment() {
    this.comments.insert(0, this.fb.group({ reporter: '', description: '' }));
  }
  removeComment(index: number) {
    this.comments.removeAt(index);
  }

  patchDataToForm() {
    //Gets the value of current Route with snapshot(URL:id)
    this.routeId = this.route.snapshot.paramMap.get('id');
    //Requests a single bug with the current ID
    this.bugsService.getBugById(this.routeId).subscribe((formData) => {
      if (formData.comments === null || undefined) {
        console.log('Comments are null Error');
      } else {
        this.commentsArray = formData.comments;
        this.commentsArray.forEach((element) => {
          this.addComment();
        });
      }
      //inserts form values
      this.updateForm.patchValue(formData);
    });
  }

  ValidateField(formInput: string) {
    //adds and Removes validation of QA input
    this.formValidationService.addRemoveValidationsOfQA(this.updateForm);
    //returns CSS Bootstrap class "is-valid" or "is-invalid"
    return this.formValidationService.CSSinputValidation(
      this.updateForm,
      formInput
    );
  }

  formSubmit(): void {
    //checks if form is valid
    if (!this.updateForm.valid) {
      //if not valid >> touches all inputs for validation
      return this.formValidationService.touchAllFormFields(this.updateForm);
    }
    // Updates form with my edited form values and navigates back to main component after 100 ms delay
    else
      this.bugsService
        .updateBug(this.routeId, this.updateForm.value)
        .pipe(delay(100))
        .subscribe((data) => {
          this.unSaved = false;
          this.router.navigate(['']);
        });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.unSaved) {
      const result = window.confirm(
        'There are unsaved changes! Are you sure you want to leave?'
      );
      return of(result);
    }
    return true;
  }
}

// private commentItem(){
//   return this.fb.group({reporter:"", description:""})
// }

// get comments():FormArray{
//   return this.createForm.get('comments') as FormArray
// }

// this.comments.push(new FormGroup({
//   commentDescription: new FormControl,
//   commentName : new FormControl
// }))

// patchForm(form: FormGroup){
//   this.bugs.getBugById(this.routeId).subscribe(bug => {
//     form.patchValue(bug)
//   })
// }
