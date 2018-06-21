import { Component, QueryList, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Episode } from '../../../interfaces/episode';
import { selectCurrentUserIsAdmin } from '../../authentication/reducers';
import { State } from '../../reducers/main';
import { GetAction, UpdateShowNotesAction } from '../actions';
import { EpisodeComponent } from '../components/episode.component';
import { selectEpisodes } from '../reducers';

@Component({
  selector: 'app-podcast',
  template: `    
    <h3 class="mat-subheading-1">
      A podcast about finding a topic to make a podcast about. Created by 
      <a href="https://twitter.com/pbredenberg" target="_blank">Paul Bredenberg</a> and 
      <a href="https://www.twitter.com/GeoffTripoli" target="_blank">Geoff Tripoli</a>.
    </h3>
    <app-episode *ngFor="let episode of episodes$ | async"
                 [isReadOnly]="!(isCurrentUserAdmin$ | async)"
                 (updateShowNotes)="handleUpdateShowNotes(episode, $event)"
                 (isPlayingChange)="handlePlayStateChanged(episode, $event)"
                 [episode]="episode"></app-episode>`,
  styleUrls: ['./podcast.component.scss']
})
export class PodcastComponent {
  public episodes$: Observable<Episode[]>;
  public isCurrentUserAdmin$: Observable<boolean>;
  @ViewChildren(EpisodeComponent)
  public episodeComponents: QueryList<EpisodeComponent>;

  constructor(private store: Store<State>) {
    this.episodes$ = this.store.select(selectEpisodes);
    this.isCurrentUserAdmin$ = this.store.select(selectCurrentUserIsAdmin);
    this.store.dispatch(new GetAction());
  }

  public handleUpdateShowNotes(episode: Episode, newShowNotes: string): void {
    this.store.dispatch(new UpdateShowNotesAction(episode.id, newShowNotes));
  }

  public handlePlayStateChanged(episode: Episode, isPlaying: boolean): void {
    if (isPlaying) {
      this.episodeComponents.forEach((episodeComponent: EpisodeComponent) => {
        if (episodeComponent.episode !== episode) {
          episodeComponent.isPlaying = false;
        }
      });
    }
  }
}
