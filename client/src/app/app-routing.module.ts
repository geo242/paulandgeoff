import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { PodcastComponent } from './podcast/containers/podcast.component';

const routes: Routes = [
  { path: '', redirectTo: '/podcast', pathMatch: 'full' },
  { path: 'podcast', component: PodcastComponent, },
  { path: '**', redirectTo: '/podcast' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router', // name of reducer key
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
