import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input()
  show:boolean=false;
  @Output() 
  showChange = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  close(){
    console.log('close');
    this.show=false;
    this.showChange.emit(this.show)
  }

}
