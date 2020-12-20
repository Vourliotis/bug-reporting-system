import { isDefined } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Bugs } from '../models/bugs.model';
import { BugsService } from '../services/bugs.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  animations: [
    // animation triggers go here
    trigger('flyInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.6s ease-in-out')
      ])
      // transition(':enter',[
      //   style({opacity: '0'}),
      //   animate('0.8s ease-in-out')
      // ])
      // ,
      // transition(':leave',[
      //   style({transform: 'translateX(100%)'}),
      //   animate('0.5s ease-out')
      // ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('0.7s ease-in-out')
      ])
    ])
  ]
})
export class ContentComponent implements OnInit {
  state = false;

  arrayOfBugs: Bugs[];
  pageNumber = 0;
  totalPages = 0;
  params: URLSearchParams;
  advancedSearch = false;
  advancedSearchForm: FormGroup;
  previousParams: URLSearchParams = null;

  currentSort = {
    order: false,
    currentCategory: 'none'
  };

  constructor(
    private bugs: BugsService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.advancedSearchForm = this.fb.group({
      title: [''],
      priority: [''],
      reporter: [''],
      status: ['']
    });

    this.params = this.bugs.createQueryString(
      null,
      null,
      null,
      this.pageNumber
    );
    this.bugs.getBugsByQuery(this.params).subscribe((response) => {
      this.arrayOfBugs = response.body;
      response.headers
        .keys()
        .map((key) => console.log(`${key}: ${response.headers.get(key)}`));
      this.pageNumber = Number(response.headers.get('Page'));
      this.totalPages = Number(response.headers.get('Totalpages'));
    });
  }

  toggleAdvanced() {
    this.state = this.state ? false : true;
  }

  sortBugs(category: string) {
    if (this.currentSort.currentCategory == category) {
      if (this.currentSort.order == false) {
        this.currentSort.order = true;
      } else {
        this.currentSort.order = false;
      }
    } else {
      this.currentSort.order = true;
      this.currentSort.currentCategory = category;
    }

    if (this.advancedSearch) {
      this.previousParams = this.params;
      this.params = this.bugs.createQueryString(
        null,
        category,
        this.currentSort.order
      );
      this.params = this.bugs.combineParams(this.previousParams, this.params);
      this.advancedSearch = false;
    } else {
      this.params = this.bugs.combineParams(
        this.params,
        this.bugs.createQueryString(null, category, this.currentSort.order)
      );
    }

    this.bugs.getBugsByQuery(this.params).subscribe((data) => {
      this.arrayOfBugs = data.body;
      this.pageNumber = Number(data.headers.get('Page'));
      this.totalPages = Number(data.headers.get('Totalpages'));
    });
  }

  arrowStyle(category: string) {
    if (
      this.currentSort.currentCategory == category &&
      this.currentSort.order == false
    ) {
      return 'fa-sort-down';
    } else if (
      this.currentSort.currentCategory == category &&
      this.currentSort.order == true
    ) {
      return 'fa-sort-up';
    } else {
      return '';
    }
  }

  deleteBug(id: string) {
    const result = window.confirm('Are you sure you want to delete this bug?');
    if (result) {
      this.bugs.deleteBug(id).subscribe((resp) => {
        // this.arrayOfBugs = this.arrayOfBugs.filter((item) => item.id !== id);
        if (this.pageNumber > Number(resp.headers.get('Totalpages'))) {
          this.pageNumber -= 1;
          this.params.set('page', String(this.pageNumber));
        }
        this.bugs.getBugsByQuery(this.params).subscribe((data) => {
          this.pageNumber = Number(data.headers.get('Page'));
          this.totalPages = Number(data.headers.get('Totalpages'));
          this.arrayOfBugs = data.body;
        });
      });
    }
  }

  changePage(direction: string) {
    if (direction == 'increase') {
      this.pageNumber += 1;
    } else if (direction == 'decrease') {
      this.pageNumber -= 1;
    }

    if (this.advancedSearch) {
      this.previousParams = this.params;
      this.params = this.bugs.createQueryString(
        null,
        null,
        null,
        this.pageNumber
      );
      this.params = this.bugs.combineParams(this.previousParams, this.params);
      this.advancedSearch = false;
    } else {
      this.params = this.bugs.combineParams(
        this.params,
        this.bugs.createQueryString(null, null, null, this.pageNumber)
      );
    }

    this.bugs.getBugsByQuery(this.params).subscribe((data) => {
      this.pageNumber = Number(data.headers.get('Page'));
      this.totalPages = Number(data.headers.get('Totalpages'));
      this.arrayOfBugs = data.body;
    });
  }

  formSubmit(): void {
    this.params = this.bugs.createQueryString(this.advancedSearchForm.value);
    this.bugs.getBugsByQuery(this.params).subscribe((resp) => {
      this.arrayOfBugs = resp.body;
      this.pageNumber = Number(resp.headers.get('Page'));
      this.totalPages = Number(resp.headers.get('Totalpages'));
    });
    this.advancedSearch = true;
    this.currentSort = {
      order: false,
      currentCategory: 'none'
    };
  }

  clearAdvancedSearch(): void {
    this.advancedSearchForm.get('title').setValue('');
    this.advancedSearchForm.get('priority').setValue('');
    this.advancedSearchForm.get('reporter').setValue('');
    this.advancedSearchForm.get('status').setValue('');
  }
}
