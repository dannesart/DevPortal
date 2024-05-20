import { Component, Input, OnInit } from '@angular/core';
import { CodeTypes, ICode } from 'src/app/models/code';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
})
export class CodeComponent implements OnInit {
  @Input() config: ICode = {
    type: CodeTypes.json,
    snippet: '',
  };

  constructor() {}

  ngOnInit() {}
}
