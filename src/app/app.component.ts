import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeadNavComponent} from './shared/components/head-nav/head-nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeadNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
