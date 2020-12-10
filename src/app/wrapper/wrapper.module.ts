import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { BugsModule } from '../bugs/bugs.module';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [HeaderComponent, ContentComponent, FooterComponent, WrapperComponent],
  imports: [
    CommonModule,
    BugsModule,
    AppRoutingModule
  ],
  exports:[
    WrapperComponent
  ]
})
export class WrapperModule { }
