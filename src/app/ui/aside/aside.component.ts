import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { asideRoutes } from 'src/app/constants/routes';
import { IRoute } from 'src/app/models/route';

@Component({
  selector: 'ui-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  public routes: IRoute[] = asideRoutes;

  public goHome = () => {
    this.router.navigate(['/']);
  };

  constructor(public router: Router) {}

  ngOnInit() {}
}
