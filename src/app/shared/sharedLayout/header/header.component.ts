import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  {
  @Input() isToggled :Boolean;

  constructor(private router: Router) { }

  toggleSidebar() {
    console.log(this.isToggled)
    this.isToggled = !this.isToggled;
  }
}
