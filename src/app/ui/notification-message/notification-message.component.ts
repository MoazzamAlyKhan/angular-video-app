import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NotifyService } from '../../core/notify.service';

@Component({
  selector: 'notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationMessageComponent{

  constructor(public notify: NotifyService) { }
  

}
