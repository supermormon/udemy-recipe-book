import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() routeChange = new EventEmitter<string>();
  collapsed = true;

  constructor() { }

  ngOnInit() {
  }

  onSelectRoute(routeName: string) {
    this.routeChange.emit(routeName);
  }

}
