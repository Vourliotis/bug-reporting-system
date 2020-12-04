import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Bugs } from 'src/app/bugs';
import { DataService } from 'src/app/data.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  arrayOfBugs: Array<Bugs>;
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






    // this.DataService.getBugs().subscribe((data) => {
    //   this.bugsArray = data;
    // })


  // sortBy(keyValue: string, order: string) {
  //   this.DataService.sortBugsBy(keyValue, order).subscribe((data) => {
  //     this.bugsArray = data;
  //   })
  // }

  // orderBy() {
  //   if (this.order == "asc") {
  //     this.order = "desc";
  //   } else {
  //     this.order = "asc";
  //   }
  // }
