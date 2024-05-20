import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationService } from 'src/app/services/applications.service';
import { DeveloperService } from 'src/app/services/developer.service';
import { PortalService } from 'src/app/services/portal.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
})
export class ContainerComponent {
  public apiStatus$: Observable<boolean> = this.portal.getApiStatus$();

  @ViewChild('main') main: ElementRef;

  constructor(
    public developerService: DeveloperService,
    public applicationService: ApplicationService,
    public ui: UiService,
    public portal: PortalService
  ) {}

  async ngOnInit() {
    await this.developerService.getDeveloper();
    await this.applicationService.getApplications();

    try {
      let timer: any = null;
      this.main.nativeElement.addEventListener('scroll', ($event: Event) => {
        if (timer !== null) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          // do something
          const element = $event.target as any;

          this.ui.mainScrollPos.next({ y: element.scrollTop });
        }, 150);
      });
    } catch (error) {}
  }
}
