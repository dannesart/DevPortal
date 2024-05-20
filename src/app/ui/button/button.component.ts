import { BehaviorSubject } from 'rxjs';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ButtonTheme, ButtonThemeClasses } from 'src/app/models/ui.button';

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  // Inputs

  @Input('theme') theme: ButtonTheme;

  // Outputs
  @Output('action') action: EventEmitter<any> = new EventEmitter();

  // Consts
  public buttonTheme = ButtonTheme;
  public buttonThemeClasses = ButtonThemeClasses;

  /**
   * Click handler. This should be triggerd everytime an button is clicked.
   *
   * @param $event
   */
  public handleClick = async ($event: Event) => {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }
    this.action.emit(true);
  };

  constructor() {}

  ngOnInit() {}
}
