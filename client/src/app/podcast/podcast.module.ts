import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BaseModule } from '../base/base.module';
import { MaterialModule } from '../material.module';
import { EpisodeComponent } from './components/episode.component';
import { PlayerComponent } from './components/player.component';
import { TopicSuggestionsComponent } from './components/topic-suggestions/topic-suggestions.component';
import { PodcastComponent } from './containers/podcast.component';
import { EpisodesService } from './services/episodes.service';
import { TopicSuggestionsService } from './services/topic-suggestions.service';
import { PodcastEffects } from './store/effects';
import { podcastReducer } from './store/reducer';

@NgModule({
  declarations: [
    EpisodeComponent,
    PodcastComponent,
    PlayerComponent,
    TopicSuggestionsComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
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
    EpisodesService,
    TopicSuggestionsService
  ]
})
export class PodcastModule {}
