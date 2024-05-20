import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { IInfo } from 'src/app/models/ui.info';

@Component({
  selector: 'ui-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  
  @Input('config') public config: IInfo = {
    collapsed: true,
    text: 'Missing info',
    float: false 
  }

  @HostBinding("class.relative") isRelative = true;
  @HostBinding("class.flex") isFlex = true;
  @HostBinding("class.gap-4") gap = true;
  

  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
