import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BugsService } from 'src/app/services/bugs.service';

@Component({
  selector: 'app-edit-bug',
  templateUrl: './edit-bug.component.html',
  styleUrls: ['./edit-bug.component.scss']
})
export class EditBugComponent implements OnInit, OnDestroy {

  updateForm: FormGroup
  routeSubscription: Subscription
  routeId: string
  bugsSubscription: Subscription

  constructor(private fb: FormBuilder, private bugs: BugsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      priority: [null, Validators.required],
      reporter: [null, Validators.required],
      status: [null, Validators.required]
    })

    this.routeSubscription = this.route.params.subscribe(params => {
      this.routeId = params['id']
    });

    this.patchForm
  }

  ngOnDestroy(): void {
    this.bugsSubscription.unsubscribe
  }

  formSubmit(id: string, form: FormGroup){
    this.bugsSubscription = this.bugs.updateBug(id, form.value).subscribe(response => {
      console.log("SUCCESS");
    })
  }

  patchForm(form: FormGroup){
    form.patchValue(this.bugs.getBugById(this.routeId).subscribe(response => {
      console.log('PATCH SUCCESS')
    }))
  }
}
