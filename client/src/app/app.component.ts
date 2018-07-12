import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../interfaces/user';
import { GetUserAction, LoginAction, LogoutAction } from './authentication/actions';
import { selectCurrentUser, selectIsLoggedIn } from './authentication/reducers';
import { State } from './reducers/main';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary" fxLayout="row" fxLayoutAlign="space-between">
      <!--<img class="main__logo" alt="Paul &amp; Geoff Logo"-->
           <!--src="../assets/img/paul-and-geoff-logo.svg">-->
      <div fxLayout="row" fxLayoutAlign="end center" fxFill>
        <button mat-button (click)="login()" *ngIf="!(isLoggedIn$ | async)">
          Login
        </button>
        <ng-container *ngIf="isLoggedIn$ | async">
          <mat-menu #appMenu="matMenu">
            <button mat-menu-item (click)="logout()">Logout</button>
          </mat-menu>
          <button mat-button [matMenuTriggerFor]="appMenu">
            <span>{{(currentUser$ | async)?.googleName}}</span>
          </button>
        </ng-container>
      </div>
    </mat-toolbar>

    <router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoggedIn$: Observable<boolean>;
  public currentUser$: Observable<User>;

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
