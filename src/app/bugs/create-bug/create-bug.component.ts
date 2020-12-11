import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BugsService } from 'src/app/services/bugs.service';

@Component({
  selector: 'app-create-bug',
  templateUrl: './create-bug.component.html',
  styleUrls: ['./create-bug.component.scss']
})
export class CreateBugComponent implements OnInit {

  createForm: FormGroup

  constructor(private fb: FormBuilder, private bugs: BugsService) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      priority: [null, Validators.required],
      reporter: [null, Validators.required],
      status: [, Validators.required]
    })
  }

  formSubmit(): void{
    console.log('success')
    this.bugs.postBug(this.createForm)
  }

}
