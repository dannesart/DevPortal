import { DemoService } from 'src/app/services/demo.service';
import { BehaviorSubject } from 'rxjs';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Avatars } from 'src/app/constants/auth';
import { async } from '@angular/core/testing';

@Component({
  selector: 'ui-preference-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class PreferenceAvatarComponent implements OnInit {
  // Inputs

  @Input('avatar') avatar: string;

  // Outputs
  @Output('valueChange') valueChange: EventEmitter<any> = new EventEmitter();
  @Output('valueInvalid') valueInvalid: EventEmitter<any> = new EventEmitter();
  @Output('valueValid') valueValid: EventEmitter<any> = new EventEmitter();

  // Consts
  public avatars = Avatars;

  // value
  public value: any;
  public error$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  /**
   * Actions
  */
  public updateAvatar = async(avatar: string) => {
    this.valueChange.emit(avatar);
  }


  constructor(public demo: DemoService) {}

  ngOnInit() {
  }
}
