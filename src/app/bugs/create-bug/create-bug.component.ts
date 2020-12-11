import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BugsService } from 'src/app/services/bugs.service';

@Component({
  selector: 'app-create-bug',
  templateUrl: './create-bug.component.html',
  styleUrls: ['./create-bug.component.scss']
})
export class CreateBugComponent implements OnInit {

  createForm: FormGroup

  constructor(private fb: FormBuilder, private bugs: BugsService, private router: Router) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      priority: [null, Validators.required],
      reporter: [null, Validators.required],
      status: [, Validators.required]
    })
  }

  formSubmit(form: FormGroup): void{
    this.bugs.postBug(form).subscribe(response => {
      console.log("POSTED")
    })
    this.router.navigate([''])
  }

}
