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
  order= true;

  title: string= "title";
  date: string = "createdAt"; 
  reporter: string = "reporter";
  status: string = "status";
  priority: string = "priority";

  constructor(private bugs: BugsService) { }

  ngOnInit(): void {
    this.bugs.getAllBugs(this.title, true).subscribe((data) => {
      this.arrayOfBugs = data;
    })
  }

 
  sortBugs(category:string, isClicked:boolean) {
    this.bugs.getAllBugs(category, isClicked).subscribe((data) => {
      this.order == true ? this.order = false : this.order = true;
      this.arrayOfBugs = data;
    })
  }

}