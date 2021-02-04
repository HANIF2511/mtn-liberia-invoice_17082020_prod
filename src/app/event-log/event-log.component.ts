import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-event-log',
  templateUrl: './event-log.component.html',
  styleUrls: ['./event-log.component.css']
})
export class EventLogComponent implements OnInit {
  @Input() title: string;
  @Input() events: string[];


  constructor() { }

  ngOnInit(): void {
  }

}
