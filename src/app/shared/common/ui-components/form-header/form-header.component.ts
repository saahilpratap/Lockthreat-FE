import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss']
})
export class FormHeaderComponent implements OnInit {

  @Input('title') title: string;

  constructor() { }

  ngOnInit() {
  }

}
