import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BugsService } from '../services/bugs.service';
import { FormValidationService } from '../services/form-validation.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-create-bug',
  templateUrl: './create-bug.component.html',
  styleUrls: ['./create-bug.component.scss'],
  animations: [
    // animation triggers go here
    trigger('flyInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s ease-out')
      ])
      // ,
      // transition(':leave', [
      //   style({ transform: 'translateX(100%)' }),
      //   animate('0.5s ease-out')
      // ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('0.6s ease-in-out')
      ]),
      transition(':leave', [
        animate(300, style({opacity: 0}))
      ])
    ])
  ]
})
export class CreateBugComponent implements OnInit {
  //commented out also ^^ implements OnDestroy
  state = true;
  createForm: FormGroup;
  // bugsSubscription: Subscription
  unsaved = true;

  get comments() {
    return this.createForm.get('comments') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private bugsService: BugsService,
    private router: Router,
    private formValidationService: FormValidationService
  ) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      priority: [null, Validators.required],
      reporter: [null, Validators.required],
      status: [null],
      comments: this.fb.array([])
    });
  }

  //function also called in html , use of insert 0 to push comment on the top
  addComment() {
    this.comments.insert(0, this.fb.group({ reporter: '', description: '' }));
  }
  removeComment(index: number) {
    this.comments.removeAt(index);
  }

  validateField(formInput: string) {
    //adds and Removes validation of QA input
    this.formValidationService.addRemoveValidationsOfQA(this.createForm);
    //returns CSS Bootstrap class "is-valid" or "is-invalid"
    return this.formValidationService.cssInputValidation(
      this.createForm,
      formInput
    );
  }

  formSubmit(): void {
    if (!this.createForm.valid) {
      //if not valid >> touches all inputs for validation
      return this.formValidationService.touchAllFormFields(this.createForm);
    }
    // Posts form data to server after 100 ms delay
    else {
      this.bugsService
        .postBug(this.createForm.value)
        .pipe(delay(100))
        .subscribe((response) => {
          this.unsaved = false;
          this.router.navigate(['']);
        });
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (
      !this.createForm.pristine &&
      (this.createForm.invalid || this.unsaved)
    ) {
      const result = window.confirm(
        'There are unsaved changes! Are you sure you want to leave?'
      );
      return of(result);
    }
    return true;
  }
}
