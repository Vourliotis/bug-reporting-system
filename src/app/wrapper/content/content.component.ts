import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  bugsArray: Array<string>;
  order: string = "asc";

  title: string = "title";
  date: string = "createdAt";
  reporter: string = "reporter";
  status: string = "status";
  priority: string = "priority";

  constructor(private DataService: DataService) { }

  ngOnInit(): void {
    this.DataService.getBugs().subscribe((data) => {
      this.bugsArray = data;
    })
  }
  sortBy(keyValue: string, order: string) {
    this.DataService.sortBy(keyValue, order).subscribe((data) => {
      this.bugsArray = data;
    })
  }

  orderBy() {
    if (this.order == "asc") {
      this.order = "desc";
    } else {
      this.order = "asc";
    }
  }

}
