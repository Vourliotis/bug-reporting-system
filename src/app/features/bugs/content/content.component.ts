import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Bugs } from '../models/bugs.model';
import { BugsService } from '../services/bugs.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  arrayOfBugs: Bugs[];
  pageNumber = 0;
  totalPages = 0;
  params: URLSearchParams;
  advancedSearch: boolean = false;
  searchForm: FormGroup;
  previousParams: URLSearchParams = null;

  currentSort = {
    order: false,
    currentCategory: 'none',
  };

  constructor(
    private bugs: BugsService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      title: [null],
      priority: [null],
      reporter: [null],
      status: [null],
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

    this.params = this.bugs.createQueryString(
      null,
      category,
      this.currentSort.order
    );
    this.bugs.getBugsByQuery(this.params).subscribe((data) => {
      this.arrayOfBugs = data.body;
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
    this.bugs.deleteBug(id).subscribe((data) => {
      this.arrayOfBugs = this.arrayOfBugs.filter((item) => item.id !== id);
    });
  }

  changePage(direction: string) {
    if (direction == 'increase') {
      this.pageNumber += 1;
    } else if (direction == 'decrease') {
      this.pageNumber -= 1;
    }

    if(this.advancedSearch){
      this.previousParams = this.params;
      this.advancedSearch = false;
    }

    this.params = this.bugs.createQueryString(
      null,
      null,
      null,
      this.pageNumber
    );
    this.bugs.getBugsByQuery(this.params, this.previousParams).subscribe((data) => {
      this.pageNumber = Number(data.headers.get('Page'));
      this.totalPages = Number(data.headers.get('Totalpages'));
      this.arrayOfBugs = data.body;
    });
  }

  formSubmit(): void {
    this.params = this.bugs.createQueryString(this.searchForm.value);
    this.bugs.getBugsByQuery(this.params).subscribe((resp) => {
      this.arrayOfBugs = resp.body;
      this.pageNumber = Number(resp.headers.get('Page'));
      this.totalPages = Number(resp.headers.get('Totalpages'));
    });
    this.advancedSearch = true
  }
}
