import { Component, QueryList, ViewChildren } from '@angular/core';
import { select, Store } from '@ngrx/store';
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
    <header>
      <img class="main__logo" alt="Paul &amp; Geoff Logo"
           src="../assets/img/paul-and-geoff-logo.svg">
      <h3 class="mat-subheading-2">
        A podcast about finding a topic to make a podcast about.
      </h3>
      <h4 class="mat-caption">Created by Paul Bredenberg and Geoff Tripoli.</h4>

    </header>
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
    this.episodes$ = this.store.pipe(select(selectEpisodes));
    this.isCurrentUserAdmin$ = this.store.pipe(select(selectCurrentUserIsAdmin));
    this.store.dispatch(new GetAction());
  }

  public handleUpdateShowNotes(episode: Episode, newShowNotes: string): void {
    this.store.dispatch(new UpdateShowNotesAction(episode.episodeId, newShowNotes));
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
