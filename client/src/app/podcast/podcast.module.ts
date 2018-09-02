import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EpisodeComponent } from './components/episode.component';
import { MaterialModule } from '../material.module';
import { PodcastComponent } from './containers/podcast.component';
import { PodcastEffects } from './effects';
import { podcastReducer } from './reducers';
import { EpisodesService } from './services/episodes.service';
import { PlayerComponent } from './components/player.component';
import { TopicSuggestionsComponent } from './components/topic-suggestions/topic-suggestions.component';
import { TopicSuggestionsService } from './services/topic-suggestions.service';

@NgModule({
  declarations: [
    EpisodeComponent,
    PodcastComponent,
    PlayerComponent,
    TopicSuggestionsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
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
