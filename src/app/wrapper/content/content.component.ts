import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bugs } from 'src/app/models/bugs.model';
import { BugsService } from 'src/app/services/bugs.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  arrayOfBugs: Bugs[];
  pageNumber = 0;
  returnPage = 0;
  increaseEnabled = true;
  
  currentSort = {
    order: false,
    currentCategory: "none"
  }

  constructor(private bugs: BugsService, private router: Router) { }

  ngOnInit(): void {
    this.bugs.getBugsByPage(this.pageNumber).subscribe((data) => {
      this.arrayOfBugs = data;
    })
    this.checkNextPage()
  }

  sortBugs(category:string) {

    if(this.currentSort.currentCategory == category){
      if(this.currentSort.order == false){
        this.currentSort.order = true
      }else{
        this.currentSort.order = false
      }
    }else{
      this.currentSort.order = true
      this.currentSort.currentCategory = category
    }

    this.bugs.getBugs(this.currentSort.order, category).subscribe((data) => {
      this.arrayOfBugs = data;
    })
  }

  arrowStyle(category:string){
    if(this.currentSort.currentCategory == category && this.currentSort.order == false){
      return "fa-sort-down"
    }else if(this.currentSort.currentCategory == category && this.currentSort.order == true){
      return "fa-sort-up"
    }else{
      return ""
    }
  }

  deleteBug(id:string){
    this.bugs.deleteBug(id).subscribe(data => {
      this.arrayOfBugs = this.arrayOfBugs.filter(item => item.id !== id);
    });
  }

  changePage(direction: string){
    if(direction == "increase"){
      this.pageNumber += 1
    }else if(direction == "decrease"){
      this.pageNumber -= 1
    }
    this.bugs.getBugsByPage(this.pageNumber).subscribe((data) => {
      if( (data === undefined || data.length == 0) &&  direction == "increase"){
        this.pageNumber -= 1
        this.returnPage = this.pageNumber
        this.increaseEnabled = false;
        return;
      }
      this.arrayOfBugs = data;
    })
    this.checkNextPage()
    this.returnPage = this.pageNumber
  }

  checkNextPage(){
    let nextPage = this.pageNumber + 1;
    this.bugs.getBugsByPage(nextPage).subscribe((data) => {
      if( (data === undefined || data.length == 0)){
        this.increaseEnabled = false;
        return;
      }
      this.increaseEnabled = true;
    })
  }
}