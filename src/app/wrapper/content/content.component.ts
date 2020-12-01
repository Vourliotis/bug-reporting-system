import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  bugsArray:Array<string>;

  constructor(private DataService:DataService) { }

  ngOnInit(): void {
    this.DataService.getBugs().subscribe((data)=>{
      console.log(data);
      this.bugsArray = data;
    })
  }

  

}
