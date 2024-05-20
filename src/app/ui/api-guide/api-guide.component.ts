import { DemoService } from 'src/app/services/demo.service';
import { UiService } from 'src/app/services/ui.service';
import {
  GuideComponentTypes,
  IGuide,
  IGuideSegment,
} from 'src/app/models/guide';
import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-api-guide',
  templateUrl: './api-guide.component.html',
  styleUrls: ['./api-guide.component.scss'],
})
export class ApiGuideComponent implements OnInit {
  public componentTypes = GuideComponentTypes;

  @Input() guide: IGuide = { segments: [] };

  public scrollToSegment = (segment: IGuideSegment) => {
    if (segment.headline) {
      const element = document.getElementById(segment.headline);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
  };

  constructor(public ui: UiService, public demo: DemoService) {}

  ngOnInit() {}
}
