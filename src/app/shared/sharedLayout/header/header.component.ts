import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  {
  isSidebarVisible: boolean;

  constructor(private router: Router) { }
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
