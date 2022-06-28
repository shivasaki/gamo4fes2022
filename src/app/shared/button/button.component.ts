import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() labelText = 'More';
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();
}
