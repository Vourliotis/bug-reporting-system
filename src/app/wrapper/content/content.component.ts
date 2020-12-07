import { Component, OnInit } from '@angular/core';
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
    currentValue: "none"
  }

  constructor(private bugs: BugsService) { }

  ngOnInit(): void {
    this.bugs.getAllBugs(!this.currentSort.order).subscribe((data) => {
      this.arrayOfBugs = data;
    })
  }

  sortBugs(category:string) {
    this.bugs.getAllBugs(this.currentSort.order, category).subscribe((data) => {
      this.arrayOfBugs = data;
    })
    
    if(this.currentSort.currentValue == category){
      if(this.currentSort.order == false){
        this.currentSort.order = true
      }else{
        this.currentSort.order = false
      }
    }else{
      this.currentSort.order = true
      this.currentSort.currentValue = category
    }
  }

}