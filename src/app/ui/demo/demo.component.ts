import { DemoService } from 'src/app/services/demo.service';
import { IEmulator } from 'src/app/models/emulator';
import { IConsoleEvent } from 'src/app/models/console';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDemo } from 'src/app/models/demo';
import { Demos } from 'src/app/mocks/demo';

@Component({
  selector: 'app-demo',
  templateUrl: 'demo.component.html',
})
export class DemoComponent implements OnInit {
  @Input() demo: IDemo = { name: Demos.none, authRequired: true };
  @Input() config: IEmulator | undefined;
  @Output('emulatorEvents') emulatorEvents: EventEmitter<IConsoleEvent> =
    new EventEmitter<IConsoleEvent>();

  public initializing = false;
  public running = '';
  public demos = Demos;

  public handleConsoleEvents = (event: IConsoleEvent) => {
    this.emulatorEvents.emit(event);
  };

  public get isAuth() {
    const expire = this.demoService.getStateProp('token_expires');
    if (!expire) return false;
    return this.demoService.getStateProp('token');
  }

  constructor(public demoService: DemoService) {}

  ngOnInit(): void {
    if (this.demo && this.demo.name) {
      // Run demo.
      setTimeout(() => {
        this.initializing = true;
      }, 1000);
      setTimeout(() => {
        this.running = this.demo?.name || '';
      }, 3000);
    }
  }
}
