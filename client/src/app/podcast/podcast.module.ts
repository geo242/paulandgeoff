import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EpisodeComponent } from './components/episode.component';
import { MaterialModule } from '../material.module';
import { PodcastComponent } from './containers/podcast.component';
import { PodcastEffects } from './effects';
import { podcastReducer } from './reducers';
import { EpisodesService } from './services/episodes.service';
import { PlayerComponent } from './components/player.component';

@NgModule({
  declarations: [
    EpisodeComponent,
    PodcastComponent,
    PlayerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([PodcastEffects]),
    StoreModule.forFeature('podcast', podcastReducer)
  ],
  exports: [
    EpisodeComponent,
    PodcastComponent
  ],
  providers: [
    EpisodesService
  ]
})
export class PodcastModule {}
