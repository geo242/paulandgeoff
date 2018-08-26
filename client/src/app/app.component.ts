import { Component, OnInit } from '@angular/core';
import { faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/pro-regular-svg-icons/faEnvelope';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../interfaces/user';
import { GetUserAction, LoginAction, LogoutAction } from './authentication/actions';
import { selectCurrentUser, selectIsLoggedIn } from './authentication/reducers';
import { State } from './reducers/main';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary" fxLayout="row">
      <!--<img class="main__logo" alt="Paul &amp; Geoff Logo"-->
      <!--src="../assets/img/paul-and-geoff-logo.svg">-->
      <div class="social-links" fxFlex fxLayout="row" fxLayoutAlign="start center">
        <a mat-button href="https://twitter.com/pbredenberg" target="_blank" fxHide.lt-sm>
          <fa-icon [icon]="twitterIcon"></fa-icon>
          Paul Bredenberg
        </a>
        <a mat-button href="https://twitter.com/GeoffTripoli" target="_blank" fxHide.lt-sm>
          <fa-icon [icon]="twitterIcon"></fa-icon>
          Geoff Tripoli
        </a>

        <mat-menu #twitterMenu="matMenu">
          <a mat-menu-item href="https://twitter.com/pbredenberg" target="_blank">
            <fa-icon [icon]="twitterIcon"></fa-icon>
            Paul Bredenberg
          </a>
          <a mat-menu-item href="https://twitter.com/GeoffTripoli" target="_blank">
            <fa-icon [icon]="twitterIcon"></fa-icon>
            Geoff Tripoli
          </a>
        </mat-menu>

        <button mat-icon-button [matMenuTriggerFor]="twitterMenu" fxHide.gt-xs>
          <fa-icon [icon]="twitterIcon"></fa-icon>
        </button>
        
        <a mat-button href="mailto:us@paulandgeoff.com" fxHide.lt-sm>
          <fa-icon [icon]="emailIcon"></fa-icon>
          Email
        </a>
        <a mat-icon-button href="mailto:us@paulandgeoff.com" fxHide.gt-xs>
          <fa-icon [icon]="emailIcon"></fa-icon>
        </a>

        <a mat-button href="https://www.instagram.com/paulandgeoff/" target="_blank" fxHide.lt-sm>
          <fa-icon [icon]="instagramIcon"></fa-icon>
          Follow Us
        </a>
        <a mat-icon-button href="https://www.instagram.com/paulandgeoff/" target="_blank" fxHide.gt-xs>
          <fa-icon [icon]="instagramIcon"></fa-icon>
        </a>

        <a mat-button href="https://www.youtube.com/channel/UC2Rj01Bq-BM9SgLZJLrtBiw" target="_blank" fxHide.lt-sm>
          <fa-icon [icon]="youtubeIcon"></fa-icon>
          Subscribe
        </a>
        <a mat-icon-button href="https://www.youtube.com/channel/UC2Rj01Bq-BM9SgLZJLrtBiw" target="_blank" fxHide.gt-xs>
          <fa-icon [icon]="youtubeIcon"></fa-icon>
        </a>
      </div>

      <button class="button--account" mat-button (click)="login()" *ngIf="!(isLoggedIn$ | async)">
        Login
      </button>
      <ng-container *ngIf="isLoggedIn$ | async">
        <mat-menu #appMenu="matMenu">
          <button mat-menu-item (click)="logout()">Logout</button>
        </mat-menu>
        <button class="button--account" mat-button [matMenuTriggerFor]="appMenu">
          <span>{{(currentUser$ | async)?.googleName}}</span>
        </button>
      </ng-container>
    </mat-toolbar>

    <router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoggedIn$: Observable<boolean>;
  public currentUser$: Observable<User>;

  public instagramIcon = faInstagram;
  public twitterIcon = faTwitter;
  public youtubeIcon = faYoutube;
  public emailIcon = faEnvelope;

  constructor(private store: Store<State>) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  public login(): void {
    this.store.dispatch(new LoginAction());
  }

  public logout(): void {
    this.store.dispatch(new LogoutAction());
  }

  public ngOnInit(): void {
    this.store.dispatch(new GetUserAction());
  }
}
