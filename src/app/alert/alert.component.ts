import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input()
  show:AlertTypes=AlertTypes.none;
  @Output() 
  showChange = new EventEmitter<AlertTypes>();
  constructor() { }

  ngOnInit(): void {
    console.log('AlertComponent');
  }

  hide(){
    this.show=AlertTypes.none;
    this.showChange.emit(this.show)
  }

}

export enum  AlertTypes {
  none = "",
  success = "alert-success",
  danger = "alert-danger",
  warning = "alert-warning",
  info = "alert-info",
  
}

