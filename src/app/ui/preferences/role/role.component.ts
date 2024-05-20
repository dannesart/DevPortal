import { DemoService } from 'src/app/services/demo.service';
import { BehaviorSubject } from 'rxjs';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Role } from 'src/app/models/user';
import { InputOption, InputType } from 'src/app/models/ui.input';
import { Roles } from 'src/app/constants/auth';

@Component({
  selector: 'ui-preference-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class PreferenceRoleComponent implements OnInit {
  // Inputs

  @Input('role') role: Role;

  // Outputs
  @Output('valueChange') valueChange: EventEmitter<any> = new EventEmitter();
  @Output('valueInvalid') valueInvalid: EventEmitter<any> = new EventEmitter();
  @Output('valueValid') valueValid: EventEmitter<any> = new EventEmitter();

  // Consts
  public roles = Roles;
  public inputType = InputType;
  public rolesOptions: InputOption[] = this.roles.map((role) => { return {
    value: role.name,
    text: role.name
  } });

  // value
  public value: any;
  public error$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  /**
   * Actions
  */
   public updateRole = async(role: string) => {
    this.valueChange.emit(role);
  }


  constructor(public demo: DemoService) {}

  ngOnInit() {
  }
}
