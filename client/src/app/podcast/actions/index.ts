import { Action } from '@ngrx/store';
import { Episode } from '../../../interfaces/episode';

export enum PodcastActionType {
  GET                       = '[Podcast] Get',
  GET_SUCCESS               = '[Podcast] Get Success',
  GET_FAIL                  = '[Podcast] Get Fail',
  UPDATE_SHOW_NOTES         = '[Podcast] Update Show Notes',
  UPDATE_SHOW_NOTES_SUCCESS = '[Podcast] Update Show Notes Success',
  UPDATE_SHOW_NOTES_FAIL    = '[Podcast] Update Show Notes Fail',
}

export class GetAction implements Action {
  public readonly type = PodcastActionType.GET;
}

export class GetSuccessAction implements Action {
  public readonly type = PodcastActionType.GET_SUCCESS;

  constructor(public episodes: Episode[]) {}
}

export class GetFailAction implements Action {
  public readonly type = PodcastActionType.GET_FAIL;
}

export class UpdateShowNotesAction implements Action {
  public readonly type = PodcastActionType.UPDATE_SHOW_NOTES;

  constructor(public episodeId: number, public newShowNotes: string) {

  }
}

export class UpdateShowNotesSuccessAction implements Action {
  public readonly type = PodcastActionType.UPDATE_SHOW_NOTES_SUCCESS;

  constructor(public episode: Episode) {

  }
}

export class UpdateShowNotesFailAction implements Action {
  public readonly type = PodcastActionType.UPDATE_SHOW_NOTES_FAIL;
}

export type PodcastAction =
  GetAction
  | GetSuccessAction
  | GetFailAction
  | UpdateShowNotesAction
  | UpdateShowNotesSuccessAction
  | UpdateShowNotesFailAction;
