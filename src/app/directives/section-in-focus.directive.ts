import { UiService } from 'src/app/services/ui.service';
import {
  Directive,
  ElementRef,
  HostListener,
  ViewChildren,
} from '@angular/core';

@Directive({
  selector: '[appSectionInFocus]',
})
export class SectionInFocusDirective {
  isInViewport(element: Element, pos: { y: number }) {
    const rect = element.getBoundingClientRect();
    const min = -50;
    const max = 200;

    return rect.top > min && rect.top < max;
  }

  constructor(private el: ElementRef, ui: UiService) {
    ui.mainScrollPos.subscribe((pos) => {
      const infocus = this.isInViewport(el.nativeElement, pos);
      if (pos.y >= 0 && pos.y < 200) {
        ui.sectionInView.next(null);
      }
      if (infocus) {
        ui.sectionInView.next(el.nativeElement.id);
      }
    });
  }
}
