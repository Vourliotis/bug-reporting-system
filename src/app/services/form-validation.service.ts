import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor(private fb: FormBuilder) { }

  addRemoveValidationsOfQA(formGroup:FormGroup):void{
    // Adds a status validator if QA is selected, else removes it
    formGroup.get('reporter').valueChanges.subscribe((value) => {
      if (value === "QA") {
        formGroup.controls['status'].setValidators(Validators.required);
      }else{
        formGroup.controls['status'].clearValidators();
      }
        formGroup.controls['status'].updateValueAndValidity();
      })
    } 
  
  CSSinputValidation(formGroup: FormGroup, formControl:string):string{
    //checks if form inputs are invalid or touched , returns is-invalid class
    if (!formGroup.get(formControl).valid && formGroup.get(formControl).touched)
    return "is-invalid"
    //else returns is-valid class
    else if (!formGroup.get(formControl).invalid && formGroup.get(formControl).touched)
    return "is-valid"
  }

  touchAllFormFields(formGroup: FormGroup):void {
    //JS iteration through all inputs and marks them as touched
    Object.keys(formGroup.controls).forEach((key) => {
        formGroup.get(key).markAsTouched();
    });
  }

  createComment(){
    return this.fb.group({reporter:"", description:""})
  }

}

