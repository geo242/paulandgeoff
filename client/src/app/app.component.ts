import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../interfaces/user';
import { GetSessionAction, GetUserAction, LoginAction, LogoutAction } from './authentication/actions';
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
          <i class="fab fa-twitter"></i>
          Paul Bredenberg
        </a>
        <a mat-button href="https://twitter.com/GeoffTripoli" target="_blank" fxHide.lt-sm>
          <i class="fab fa-twitter"></i>
          Geoff Tripoli
        </a>

        <mat-menu #twitterMenu="matMenu">
          <a mat-menu-item href="https://twitter.com/pbredenberg" target="_blank">
            <i class="fab fa-twitter"></i>
            Paul Bredenberg
          </a>
          <a mat-menu-item href="https://twitter.com/GeoffTripoli" target="_blank">
            <i class="fab fa-twitter"></i>
            Geoff Tripoli
          </a>
        </mat-menu>

        <button mat-icon-button [matMenuTriggerFor]="twitterMenu" fxHide.gt-xs>
          <i class="fab fa-twitter"></i>
        </button>

        <a mat-button href="mailto:us@paulandgeoff.com" fxHide.lt-sm>
          <i class="fad fa-envelope"></i>
          Email
        </a>
        <a mat-icon-button href="mailto:us@paulandgeoff.com" fxHide.gt-xs>
          <i class="fad fa-envelope"></i>
        </a>

        <a mat-button href="https://www.instagram.com/paulandgeoff/" target="_blank" fxHide.lt-sm>
          <i class="fab fa-instagram"></i>
          Follow Us
        </a>
        <a mat-icon-button href="https://www.instagram.com/paulandgeoff/" target="_blank" fxHide.gt-xs>
          <i class="fab fa-instagram"></i>
        </a>

        <a mat-button href="https://www.youtube.com/channel/UC2Rj01Bq-BM9SgLZJLrtBiw" target="_blank" fxHide.lt-sm>
          <i class="fab fa-youtube"></i>
          Subscribe
        </a>
        <a mat-icon-button href="https://www.youtube.com/channel/UC2Rj01Bq-BM9SgLZJLrtBiw" target="_blank" fxHide.gt-xs>
          <i class="fab fa-youtube"></i>
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

  // public instagramIcon = faInstagram;
  // public twitterIcon = faTwitter;
  // public youtubeIcon = faYoutube;
  // public emailIcon = faEnvelope;

  constructor(private store: Store<State>) {
    this.isLoggedIn$ = this.store.pipe(select(selectIsLoggedIn));
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
    this.store.dispatch(new GetSessionAction());
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
