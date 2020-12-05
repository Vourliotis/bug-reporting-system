import { Component, OnInit } from '@angular/core';
import { Bugs } from 'src/app/bugs';
import { DataService } from 'src/app/data.service';


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

  constructor(private DataService: DataService) { }

  ngOnInit(): void {
    this.DataService.getAllBugs(this.title, true).subscribe((data) => {
      this.arrayOfBugs = data;
    })
  }

 
  sortBugs(category:string, isClicked:boolean) {
    this.DataService.getAllBugs(category, isClicked).subscribe((data) => {
      this.order == true ? this.order = false : this.order = true;
      this.arrayOfBugs = data;
    })
  }

}