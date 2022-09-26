import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  items!:MenuItem[];

  ngOnInit(): void {
    this.items = [
      {label: 'orgDetails', icon: 'pi pi-fw pi-plus', command: () => {console.log("new here")}},
      {label: 'addPlayer', icon: 'pi pi-fw pi-download'},
      {label: 'viewPlayers', icon: 'pi pi-fw pi-refresh'}
  ];
  }

}
