import { Component, OnInit } from '@angular/core';
import { AuthService as AngularAuthService } from '@auth0/auth0-angular';
import { GetProvider, Avatars } from 'src/app/constants/auth';
import { DeveloperService } from 'src/app/services/developer.service';

@Component({
  selector: 'route-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent implements OnInit {

  public avatars = Avatars;
  public developer$ = this.developerService.developer$();


  public getUser$ = () => {
    return this.angularAuth.user$;
  };

  public updateAvatar = (value: string) => {
    this.developerService.updateDeveloper({
      avatar : value
    });
  }

  public logOut = () => {
    this.angularAuth.logout();
  };

  public updateRole = (value: string) => {
    this.developerService.updateDeveloper({
      role: value
    })
  }

  public getProvider = GetProvider;

  constructor(public angularAuth: AngularAuthService, public developerService: DeveloperService) {}

  ngOnInit() {}
}
