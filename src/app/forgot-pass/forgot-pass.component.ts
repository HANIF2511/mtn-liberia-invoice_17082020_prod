import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {
public username: string;
  constructor() { }

  ngOnInit(): void {

    this.username = localStorage.getItem('mobilenum');
  }

}
