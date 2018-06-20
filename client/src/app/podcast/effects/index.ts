import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Episode } from '../../../interfaces/episode';
import {
  GetFailAction,
  GetSuccessAction,
  PodcastActionType,
  UpdateShowNotesAction, UpdateShowNotesFailAction,
  UpdateShowNotesSuccessAction
} from '../actions';
import { EpisodesService } from '../services/episodes.service';

@Injectable()
export class PodcastEffects {
  constructor(private actions$: Actions,
              private episodes: EpisodesService) {

  }

  @Effect()
  public get$ = this.actions$
                    .ofType(PodcastActionType.GET)
                    .pipe(
                      switchMap(() =>
                        this.episodes.list()
                            .pipe(
                              map((episodes: Episode[]) => new GetSuccessAction(episodes)),
                              catchError(() => of(new GetFailAction()))
                            ))
                    );

  @Effect()
  public updateShowNotes$ = this.actions$
                                .ofType(PodcastActionType.UPDATE_SHOW_NOTES)
                                .pipe(
                                  switchMap((action: UpdateShowNotesAction) =>
                                    this.episodes.updateShowNotes(action.episodeId, action.newShowNotes)
                                        .pipe(
                                          map((episode: Episode) => new UpdateShowNotesSuccessAction(episode)),
                                          catchError(() => of(new UpdateShowNotesFailAction()))
                                        ))
                                );

}
