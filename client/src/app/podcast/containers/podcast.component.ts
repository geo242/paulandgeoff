import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Episode } from '../../../interfaces/episode';
import { selectCurrentUserIsAdmin } from '../../authentication/reducers';
import { State } from '../../reducers/main';
import { GetAction, UpdateShowNotesAction } from '../actions';
import { selectEpisodes } from '../reducers';

@Component({
  selector: 'app-podcast',
  template: `
    <app-episode *ngFor="let episode of episodes$ | async"
                 [isReadOnly]="!(isCurrentUserAdmin$ | async)"
                 (updateShowNotes)="handleUpdateShowNotes(episode, $event)"
                 [episode]="episode"></app-episode>`,
  styleUrls: ['./podcast.component.scss']
})
export class PodcastComponent {
  public episodes$: Observable<Episode[]>;
  public isCurrentUserAdmin$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.episodes$ = this.store.select(selectEpisodes);
    this.isCurrentUserAdmin$ = this.store.select(selectCurrentUserIsAdmin);
    this.store.dispatch(new GetAction());
  }

  public handleUpdateShowNotes(episode: Episode, newShowNotes: string): void {
    this.store.dispatch(new UpdateShowNotesAction(episode.id, newShowNotes));
  }
}
