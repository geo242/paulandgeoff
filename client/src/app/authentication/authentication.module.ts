import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthenticationEffects } from './effects';
import { authenticationReducer } from './reducers';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    EffectsModule.forFeature([AuthenticationEffects]),
    StoreModule.forFeature('authentication', authenticationReducer)
  ],
  providers: [
    AuthenticationService
  ]
})
export class AuthenticationModule {}
