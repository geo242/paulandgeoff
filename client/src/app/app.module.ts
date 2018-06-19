import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ServicesModule } from './services/services.module';
import { AppRoutingModule } from './app-routing.module';
import { PodcastComponent } from './podcast/podcast.component';
import { EpisodeComponent } from './episode/episode.component';

@NgModule({
  declarations: [
    AppComponent,
    PodcastComponent,
    EpisodeComponent
  ],
  imports: [
    BrowserModule,
    ServicesModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
