import {Component, inject} from '@angular/core';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {ActivatedRoute, NavigationEnd, Router, RouterLink} from '@angular/router';
import {filter, map} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-head-nav',
  imports: [
    MatTabLink,
    MatTabNav,
    MatTabNavPanel,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './head-nav.component.html'
})
export class HeadNavComponent {
  links = [{url: 'home', label: 'Home'}, {url: 'messages', label: 'Messages'}];
  router = inject(Router);
  activeLink = this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd),
      map(event =>
        event.urlAfterRedirects.indexOf('messages') >= 0 ? this.links[1] : this.links[0]
      )
    )
}
