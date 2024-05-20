import { DemoService } from 'src/app/services/demo.service';
import { BehaviorSubject } from 'rxjs';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { IInput, InputType } from 'src/app/models/ui.input';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'ui-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  // Inputs

  @Input('config') config: IInput;

  // Outputs
  @Output('valueChange') valueChange: EventEmitter<any> = new EventEmitter();
  @Output('valueInvalid') valueInvalid: EventEmitter<any> = new EventEmitter();
  @Output('valueValid') valueValid: EventEmitter<any> = new EventEmitter();

  // Consts
  public countries = this.demo.countries;
  public inputType = InputType;

  // value
  public value: any;
  public error$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  // Elements
  @ViewChild('code1') code1: ElementRef;
  @ViewChild('code2') code2: ElementRef;
  @ViewChild('code3') code3: ElementRef;
  @ViewChild('code4') code4: ElementRef;
  @ViewChild('code5') code5: ElementRef;
  @ViewChild('code6') code6: ElementRef;

  /**
   * Validate input
   * Emits valid or invalid event.
   */
  private validateInput = async () => {
    // Clear errors before validation
    this.error$.next(null);

    // Check if input is required
    if (this.config.required && !this.value) {
      this.error$.next('requiredFieldError');
      return this.valueInvalid.emit(this.value);
    }
    // Check input type.
    const type: InputType = this.config.type;

    // Check type. And validate based on type.
    // Return and emit event.
    switch (type) {
      case InputType.phone:
        if (this.validator.phone(this.value)) {
          return this.valueValid.emit(this.value);
        }
        this.error$.next('phoneFormatError');
        return this.valueInvalid.emit(this.value);
      case InputType.email:
        if (this.validator.email(this.value)) {
          return this.valueValid.emit(this.value);
        }
        this.error$.next('emailFormatError');
        return this.valueInvalid.emit(this.value);
    }
  };

  /**
   * Change handler. This should be triggerd everytime an input changes.
   * Value should validate and then trigger event of invalid or valid.
   * Value should also be emitted.
   *
   * @param $event
   */
  public handleChange = async ($event: Event) => {
    
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }
    const { value, checked } = $event.target as any;
    // Check input type.
    const type: InputType = this.config.type;

    if (type === this.inputType.checkbox) {
      this.value = checked;
    } else {
      this.value = value;
    }

    await this.validateInput();
    this.valueChange.emit(this.value);
  };

  /**
   * Handle code method
   *
   */
  public handleCode = ($event: Event, idx: number) => {
    const { value, nextSibling } = $event.target as any;

    nextSibling?.focus();

    const value1 = this.code1.nativeElement.value;
    const value2 = this.code2.nativeElement.value;
    const value3 = this.code3.nativeElement.value;
    const value4 = this.code4.nativeElement.value;
    const value5 = this.code5.nativeElement.value;
    const value6 = this.code6.nativeElement.value;

    const full = [value1, value2, value3, value4, value5, value6]
      .join('')
      .trim();
    if (full.length === 6) {
      this.valueChange.emit(full);
    }
  };

  /**
   * Initalize input.
   * Adding initValue
   */
  private initInput = async () => {
    if (this.config) {
      this.value = this.config.initValue;
    }
  };

  constructor(public validator: ValidatorsService, public demo: DemoService) {}

  ngOnInit() {
    this.initInput();
  }
}
