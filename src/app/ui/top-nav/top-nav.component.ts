import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {

 
  show = false;
  
    toggleCollapse() {
      this.show = !this.show;
    }
}
