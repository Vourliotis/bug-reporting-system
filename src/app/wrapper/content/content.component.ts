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
  
  currentSort = {
    order: false,
    currentCategory: "none"
  }

  constructor(private bugs: BugsService, private router: Router) { }

  ngOnInit(): void {
    this.bugs.getBugs(!this.currentSort.order).subscribe((data) => {
      this.arrayOfBugs = data;
    })
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

  deleteBug(id:number){
    return this.bugs.deleteBug(id);
    this.router.navigate['']
  }
}